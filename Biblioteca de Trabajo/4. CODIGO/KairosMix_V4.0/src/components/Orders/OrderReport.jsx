import React, { useState, useEffect, useMemo } from 'react';
import { X, Download, FileSpreadsheet, Filter, Calendar, DollarSign, Package, Users, TrendingUp, TrendingDown, BarChart3, PieChart, Activity } from 'lucide-react';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import './OrderReport.css';

const OrderReport = ({ orders, onClose }) => {
  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    client: '',
    status: '',
    paymentMethod: ''
  });

  const [filteredOrders, setFilteredOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('resumen'); // 'resumen', 'graficos', 'tendencias', 'detalles'
  const [reportData, setReportData] = useState({
    totalOrders: 0,
    grossSales: 0,
    netSales: 0,
    totalProducts: 0,
    totalCustomMixes: 0,
    averageOrderValue: 0,
    topProducts: [],
    salesByStatus: {},
    salesByPaymentMethod: {},
    salesByDay: {},
    salesByMonth: {},
    clientAnalysis: [],
    trendsData: {
      weeklyGrowth: 0,
      monthlyGrowth: 0,
      avgOrdersPerDay: 0,
      peakDay: '',
      peakHour: ''
    }
  });

  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);

  const orderStatuses = ['Pendiente', 'En Proceso', 'En Espera', 'Completado', 'Cancelado'];
  const paymentMethods = ['Efectivo', 'Transferencia'];

  useEffect(() => {
    loadClients();
    applyFilters();
  }, [orders, filters]);

  useEffect(() => {
    calculateReportData();
  }, [filteredOrders]);

  const loadClients = () => {
    try {
      const savedClients = localStorage.getItem('clients');
      if (savedClients) {
        setClients(JSON.parse(savedClients));
      }
    } catch (error) {
      console.error('Error loading clients:', error);
    }
  };

  const applyFilters = () => {
    let filtered = [...orders];

    // Filtro por rango de fechas
    if (filters.dateFrom) {
      filtered = filtered.filter(order => {
        const orderDate = parseDate(order.date || order.createdAt);
        const fromDate = new Date(filters.dateFrom);
        return orderDate >= fromDate;
      });
    }

    if (filters.dateTo) {
      filtered = filtered.filter(order => {
        const orderDate = parseDate(order.date || order.createdAt);
        const toDate = new Date(filters.dateTo);
        return orderDate <= toDate;
      });
    }

    // Filtro por cliente
    if (filters.client) {
      filtered = filtered.filter(order => order.client && order.client.id === filters.client);
    }

    // Filtro por estado
    if (filters.status) {
      filtered = filtered.filter(order => order.status === filters.status);
    }

    // Filtro por método de pago
    if (filters.paymentMethod) {
      filtered = filtered.filter(order => 
        (order.paymentMethod || 'Efectivo') === filters.paymentMethod
      );
    }

    setFilteredOrders(filtered);
  };

  const parseDate = (dateString) => {
    // Manejo defensivo para fechas undefined, null o vacías
    if (!dateString) {
      return new Date(); // Fecha actual por defecto
    }
    
    // Si es un string ISO (formato createdAt)
    if (dateString.includes('T') || dateString.includes('-')) {
      return new Date(dateString);
    }
    
    // Si es formato DD/MM/YYYY (formato date)
    if (typeof dateString === 'string' && dateString.includes('/')) {
      const parts = dateString.split('/');
      if (parts.length === 3) {
        return new Date(parts[2], parts[1] - 1, parts[0]);
      }
    }
    
    // Fallback: intentar crear Date directamente
    const fallbackDate = new Date(dateString);
    return isNaN(fallbackDate.getTime()) ? new Date() : fallbackDate;
  };

  const calculateReportData = () => {
    const data = {
      totalOrders: filteredOrders.length,
      grossSales: 0,
      netSales: 0,
      totalProducts: 0,
      totalCustomMixes: 0,
      averageOrderValue: 0,
      topProducts: [],
      salesByStatus: {},
      salesByPaymentMethod: {},
      salesByDay: {},
      salesByMonth: {},
      clientAnalysis: [],
      trendsData: {
        weeklyGrowth: 0,
        monthlyGrowth: 0,
        avgOrdersPerDay: 0,
        peakDay: '',
        peakHour: '',
        completionRate: 0
      }
    };

    const productSales = {};
    const clientSales = {};
    const dailySales = {};
    const monthlySales = {};
    const dayOfWeekSales = { 'Lunes': 0, 'Martes': 0, 'Miércoles': 0, 'Jueves': 0, 'Viernes': 0, 'Sábado': 0, 'Domingo': 0 };
    const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

    filteredOrders.forEach(order => {
      // Ventas brutas y netas
      data.grossSales += order.subtotal || 0;
      data.netSales += order.total || 0;

      // Análisis por fecha
      const orderDate = parseDate(order.date || order.createdAt);
      const dayKey = orderDate.toISOString().split('T')[0];
      const monthKey = `${orderDate.getFullYear()}-${String(orderDate.getMonth() + 1).padStart(2, '0')}`;
      const dayOfWeek = daysOfWeek[orderDate.getDay()];

      // Ventas diarias
      dailySales[dayKey] = (dailySales[dayKey] || 0) + (order.total || 0);
      
      // Ventas mensuales
      monthlySales[monthKey] = (monthlySales[monthKey] || 0) + (order.total || 0);
      
      // Ventas por día de la semana
      dayOfWeekSales[dayOfWeek] = (dayOfWeekSales[dayOfWeek] || 0) + (order.total || 0);

      // Conteo de productos y análisis
      order.products.forEach(product => {
        data.totalProducts += product.quantity;
        
        // Agrupar ventas por producto
        if (productSales[product.code]) {
          productSales[product.code].quantity += product.quantity;
          productSales[product.code].total += product.quantity * product.price;
          productSales[product.code].orders += 1;
        } else {
          productSales[product.code] = {
            name: product.name,
            quantity: product.quantity,
            total: product.quantity * product.price,
            orders: 1
          };
        }
      });

      // Análisis por cliente
      const clientId = order.client?.id || 'unknown';
      if (clientSales[clientId]) {
        clientSales[clientId].totalSpent += order.total || 0;
        clientSales[clientId].orderCount += 1;
      } else {
        clientSales[clientId] = {
          name: order.client?.name || 'Cliente no especificado',
          totalSpent: order.total || 0,
          orderCount: 1
        };
      }

      // Ventas por estado
      if (data.salesByStatus[order.status]) {
        data.salesByStatus[order.status].count++;
        data.salesByStatus[order.status].total += order.total || 0;
      } else {
        data.salesByStatus[order.status] = { count: 1, total: order.total || 0 };
      }

      // Ventas por método de pago
      const paymentMethod = order.paymentMethod || 'Efectivo';
      if (data.salesByPaymentMethod[paymentMethod]) {
        data.salesByPaymentMethod[paymentMethod].count++;
        data.salesByPaymentMethod[paymentMethod].total += order.total || 0;
      } else {
        data.salesByPaymentMethod[paymentMethod] = { count: 1, total: order.total || 0 };
      }
    });

    // Calcular promedio
    data.averageOrderValue = data.totalOrders > 0 ? data.netSales / data.totalOrders : 0;

    // Top productos más vendidos
    data.topProducts = Object.entries(productSales)
      .map(([code, info]) => ({ code, ...info }))
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 10);

    // Análisis de clientes ordenado por gasto total
    data.clientAnalysis = Object.entries(clientSales)
      .map(([id, info]) => ({ id, ...info, avgOrder: info.totalSpent / info.orderCount }))
      .sort((a, b) => b.totalSpent - a.totalSpent)
      .slice(0, 10);

    // Datos para gráficos
    data.salesByDay = dailySales;
    data.salesByMonth = monthlySales;
    data.salesByDayOfWeek = dayOfWeekSales;

    // Calcular tendencias
    const sortedDays = Object.keys(dailySales).sort();
    if (sortedDays.length > 1) {
      // Crecimiento semanal (últimos 7 días vs anteriores 7)
      const last7DaysSales = sortedDays.slice(-7).reduce((sum, day) => sum + (dailySales[day] || 0), 0);
      const prev7DaysSales = sortedDays.slice(-14, -7).reduce((sum, day) => sum + (dailySales[day] || 0), 0);
      data.trendsData.weeklyGrowth = prev7DaysSales > 0 ? ((last7DaysSales - prev7DaysSales) / prev7DaysSales) * 100 : 0;
    }

    // Día pico de ventas
    const peakDayEntry = Object.entries(dayOfWeekSales).sort((a, b) => b[1] - a[1])[0];
    data.trendsData.peakDay = peakDayEntry ? peakDayEntry[0] : 'N/A';

    // Promedio de pedidos por día
    const uniqueDays = Object.keys(dailySales).length;
    data.trendsData.avgOrdersPerDay = uniqueDays > 0 ? (data.totalOrders / uniqueDays).toFixed(1) : 0;

    // Tasa de completado
    const completedOrders = filteredOrders.filter(o => o.status === 'Completado').length;
    data.trendsData.completionRate = data.totalOrders > 0 ? ((completedOrders / data.totalOrders) * 100).toFixed(1) : 0;

    setReportData(data);
  };

  const clearFilters = () => {
    setFilters({
      dateFrom: '',
      dateTo: '',
      client: '',
      status: '',
      paymentMethod: ''
    });
  };

  const generateExcelReport = async () => {
    if (filteredOrders.length === 0) {
      Swal.fire({
        title: 'Sin Datos',
        text: 'No hay pedidos que coincidan con los filtros para generar el reporte',
        icon: 'warning'
      });
      return;
    }

    setLoading(true);

    try {
      // Simular generación de reporte
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Crear el workbook Excel
      const workbook = XLSX.utils.book_new();
      
      // Crear los datos del reporte según el formato de la imagen
      const excelData = generateExcelData();
      
      // Crear worksheet
      const worksheet = XLSX.utils.aoa_to_sheet(excelData);
      
      // Aplicar estilos y configuraciones
      applyExcelStyles(worksheet);
      
      // Agregar worksheet al workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Reporte Pedidos');
      
      // Generar y descargar archivo
      const currentDate = new Date().toLocaleDateString('es-EC').replace(/\//g, '-');
      const filename = `Reporte-Pedidos-KAIROSMIX-${currentDate}.xlsx`;
      
      XLSX.writeFile(workbook, filename);

      Swal.fire({
        title: '¡Reporte Generado!',
        text: 'El reporte ha sido descargado exitosamente',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      });
    } catch (error) {
      console.error('Error generating Excel report:', error);
      Swal.fire({
        title: 'Error',
        text: 'Error al generar el reporte. Intenta nuevamente.',
        icon: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const generateExcelData = () => {
    const data = [];
    const currentDate = new Date().toLocaleDateString('es-EC');
    
    // Encabezado principal
    data.push(['', '', '', '', 'REPORTE DE PEDIDOS - KAIROSMIX', '', '', '', '']);
    data.push(['', '', '', '', `Fecha: ${currentDate}`, '', '', '', '']);
    data.push(['', '', '', '', 'Tienda: El Kairo de Dios', '', '', '', '']);
    data.push(['', '', '', '', '', '', '', '', '']); // Línea vacía
    
    // Resumen General
    data.push(['', '', '', 'RESUMEN GENERAL', '', '', '', '', '']);
    data.push(['Total Productos Vendidos', '', '', reportData.totalProducts, '', '', '', '', '']);
    data.push(['Total de Pedidos', '', '', reportData.totalOrders, '', '', '', '', '']);
    data.push(['Ventas Brutas', '', '', `$${reportData.grossSales.toFixed(2)}`, '', '', '', '', '']);
    data.push(['Ventas Netas', '', '', `$${reportData.netSales.toFixed(2)}`, '', '', '', '', '']);
    data.push(['', '', '', '', '', '', '', '', '']); // Línea vacía
    
    // Detalle de Pedidos
    data.push(['', '', 'DETALLE DE PEDIDOS', '', '', '', '', '', '']);
    data.push(['ID', 'FECHA', 'CLIENTE', 'ESTADO', 'MÉTODO DE PAGO', 'SUBTOTAL', 'IVA', 'TOTAL', '']);
    
    filteredOrders.forEach(order => {
      const subtotal = order.subtotal || 0;
      const iva = (order.total || 0) - subtotal;
      
      data.push([
        order.id,
        formatDate(order.date || order.createdAt),
        order.client && order.client.name ? order.client.name : 'Cliente no especificado',
        order.status,
        order.paymentMethod || 'Efectivo',
        `$${subtotal.toFixed(2)}`,
        `$${iva.toFixed(2)}`,
        `$${(order.total || 0).toFixed(2)}`,
        ''
      ]);
    });
    
    data.push(['', '', '', '', '', '', '', '', '']); // Línea vacía
    
    // Productos Más Vendidos
    data.push(['', '', 'PRODUCTOS MÁS VENDIDOS', '', '', '', '', '', '']);
    data.push(['CÓDIGO', 'PRODUCTO', 'CANTIDAD (Lb)', 'TOTAL VENTAS', '', '', '', '', '']);
    
    reportData.topProducts.forEach(product => {
      data.push([
        product.code,
        product.name,
        product.quantity,
        `$${product.total.toFixed(2)}`,
        '',
        '',
        '',
        '',
        ''
      ]);
    });
    
    data.push(['', '', '', '', '', '', '', '', '']); // Línea vacía
    
    // Productos Vendidos (Stock)
    data.push(['', '', 'PRODUCTOS VENDIDOS', '', '', '', '', '', '']);
    data.push(['CÓDIGO', 'PRODUCTO', 'STOCK (Lb)', '', '', '', '', '', '']);
    
    // Obtener productos únicos y sus stocks
    const productStock = {};
    filteredOrders.forEach(order => {
      order.products.forEach(product => {
        if (productStock[product.code]) {
          productStock[product.code].stock += product.quantity;
        } else {
          productStock[product.code] = {
            name: product.name,
            stock: product.quantity
          };
        }
      });
    });
    
    Object.entries(productStock).forEach(([code, info]) => {
      data.push([
        code,
        info.name,
        info.stock,
        '',
        '',
        '',
        '',
        '',
        ''
      ]);
    });
    
    return data;
  };

  const applyExcelStyles = (worksheet) => {
    // Configurar ancho de columnas
    const colWidths = [
      { wch: 10 }, // A
      { wch: 15 }, // B
      { wch: 25 }, // C
      { wch: 15 }, // D
      { wch: 20 }, // E
      { wch: 12 }, // F
      { wch: 12 }, // G
      { wch: 12 }, // H
      { wch: 5 }   // I
    ];
    
    worksheet['!cols'] = colWidths;
    
    // Configurar rango de impresión
    const range = XLSX.utils.decode_range(worksheet['!ref']);
    worksheet['!margins'] = { left: 0.7, right: 0.7, top: 0.75, bottom: 0.75, header: 0.3, footer: 0.3 };
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-EC', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) {
      return 'Fecha no disponible';
    }
    
    // Si es un string ISO (formato createdAt), convertir a DD/MM/YYYY
    if (dateString.includes('T') || dateString.includes('-')) {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Fecha inválida';
      }
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }
    
    // Si ya está en formato DD/MM/YYYY, devolverlo tal como está
    return dateString;
  };

  // Componente de gráfico de barras CSS
  const BarChartCSS = ({ data, title, maxValue }) => {
    const max = maxValue || Math.max(...Object.values(data), 1);
    return (
      <div className="chart-container">
        <h6 className="chart-title">{title}</h6>
        <div className="bar-chart">
          {Object.entries(data).map(([label, value]) => (
            <div key={label} className="bar-item">
              <div className="bar-label">{label}</div>
              <div className="bar-track">
                <div 
                  className="bar-fill" 
                  style={{ width: `${(value / max) * 100}%` }}
                >
                  <span className="bar-value">{formatCurrency(value)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Componente de gráfico circular CSS
  const PieChartCSS = ({ data, title }) => {
    const total = Object.values(data).reduce((sum, item) => sum + (item.total || item), 0);
    const colors = ['#27ae60', '#3498db', '#f39c12', '#e74c3c', '#9b59b6', '#1abc9c'];
    let currentRotation = 0;
    
    return (
      <div className="chart-container">
        <h6 className="chart-title">{title}</h6>
        <div className="pie-chart-wrapper">
          <div className="pie-chart">
            {Object.entries(data).map(([label, item], index) => {
              const value = item.total || item;
              const percentage = total > 0 ? (value / total) * 100 : 0;
              const rotation = currentRotation;
              currentRotation += percentage * 3.6;
              return (
                <div
                  key={label}
                  className="pie-segment"
                  style={{
                    '--rotation': `${rotation}deg`,
                    '--percentage': `${percentage}%`,
                    '--color': colors[index % colors.length]
                  }}
                />
              );
            })}
          </div>
          <div className="pie-legend">
            {Object.entries(data).map(([label, item], index) => {
              const value = item.total || item;
              const count = item.count || 0;
              const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
              return (
                <div key={label} className="legend-item">
                  <span className="legend-color" style={{ backgroundColor: colors[index % colors.length] }}></span>
                  <span className="legend-label">{label}</span>
                  <span className="legend-value">{formatCurrency(value)} ({percentage}%)</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // Componente de tarjeta de tendencia
  const TrendCard = ({ title, value, trend, icon: Icon, color }) => {
    const isPositive = trend >= 0;
    return (
      <div className={`trend-card trend-${color}`}>
        <div className="trend-icon">
          <Icon size={24} />
        </div>
        <div className="trend-content">
          <h4>{value}</h4>
          <p>{title}</p>
          {trend !== undefined && (
            <span className={`trend-indicator ${isPositive ? 'positive' : 'negative'}`}>
              {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              {Math.abs(trend).toFixed(1)}%
            </span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="order-report">
      <div className="report-header">
        <h3>
          <FileSpreadsheet className="header-icon" />
          Reporte de Pedidos y Análisis
        </h3>
        <div className="header-actions">
          <button
            className="btn btn-success"
            onClick={generateExcelReport}
            disabled={loading}
          >
            <FileSpreadsheet size={16} />
            {loading ? 'Generando...' : 'Descargar Excel'}
          </button>
          <button
            className="btn btn-secondary"
            onClick={onClose}
          >
            <X size={16} />
            Cerrar
          </button>
        </div>
      </div>

      <div className="report-content">
        {/* Filtros */}
        <div className="filters-section">
          <h5>
            <Filter size={18} />
            Filtros del Reporte
          </h5>
          <div className="row">
            <div className="col-md-3">
              <label className="form-label">Fecha Desde</label>
              <input
                type="date"
                className="form-control"
                value={filters.dateFrom}
                onChange={(e) => setFilters(prev => ({ ...prev, dateFrom: e.target.value }))}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Fecha Hasta</label>
              <input
                type="date"
                className="form-control"
                value={filters.dateTo}
                onChange={(e) => setFilters(prev => ({ ...prev, dateTo: e.target.value }))}
              />
            </div>
            <div className="col-md-2">
              <label className="form-label">Cliente</label>
              <select
                className="form-select"
                value={filters.client}
                onChange={(e) => setFilters(prev => ({ ...prev, client: e.target.value }))}
              >
                <option value="">Todos</option>
                {clients.map(client => (
                  <option key={client.id} value={client.id}>{client.name}</option>
                ))}
              </select>
            </div>
            <div className="col-md-2">
              <label className="form-label">Estado</label>
              <select
                className="form-select"
                value={filters.status}
                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
              >
                <option value="">Todos</option>
                {orderStatuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
            <div className="col-md-2">
              <label className="form-label">Método Pago</label>
              <select
                className="form-select"
                value={filters.paymentMethod}
                onChange={(e) => setFilters(prev => ({ ...prev, paymentMethod: e.target.value }))}
              >
                <option value="">Todos</option>
                {paymentMethods.map(method => (
                  <option key={method} value={method}>{method}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="filter-actions">
            <button
              className="btn btn-outline-warning btn-sm"
              onClick={clearFilters}
            >
              Limpiar Filtros
            </button>
          </div>
        </div>

        {/* Pestañas de navegación */}
        <div className="report-tabs">
          <button 
            className={`tab-btn ${activeTab === 'resumen' ? 'active' : ''}`}
            onClick={() => setActiveTab('resumen')}
          >
            <DollarSign size={16} />
            Resumen
          </button>
          <button 
            className={`tab-btn ${activeTab === 'graficos' ? 'active' : ''}`}
            onClick={() => setActiveTab('graficos')}
          >
            <BarChart3 size={16} />
            Gráficos
          </button>
          <button 
            className={`tab-btn ${activeTab === 'tendencias' ? 'active' : ''}`}
            onClick={() => setActiveTab('tendencias')}
          >
            <Activity size={16} />
            Tendencias
          </button>
          <button 
            className={`tab-btn ${activeTab === 'detalles' ? 'active' : ''}`}
            onClick={() => setActiveTab('detalles')}
          >
            <FileSpreadsheet size={16} />
            Detalles
          </button>
        </div>

        {/* TAB: RESUMEN */}
        {activeTab === 'resumen' && (
          <>
            {/* Resumen de Estadísticas */}
            <div className="statistics-section">
              <h5>Resumen de Estadísticas</h5>
              <div className="row">
                <div className="col-md-3">
                  <div className="stat-card">
                    <div className="stat-icon">
                      <FileSpreadsheet className="text-primary" />
                    </div>
                    <div className="stat-info">
                      <h3>{reportData.totalOrders}</h3>
                      <p>Total Pedidos</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="stat-card">
                    <div className="stat-icon">
                      <DollarSign className="text-success" />
                    </div>
                    <div className="stat-info">
                      <h3>{formatCurrency(reportData.netSales)}</h3>
                      <p>Ventas Netas</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="stat-card">
                    <div className="stat-icon">
                      <Package className="text-warning" />
                    </div>
                    <div className="stat-info">
                      <h3>{reportData.totalProducts}</h3>
                      <p>Productos Vendidos</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="stat-card">
                    <div className="stat-icon">
                      <Users className="text-info" />
                    </div>
                    <div className="stat-info">
                      <h3>{formatCurrency(reportData.averageOrderValue)}</h3>
                      <p>Promedio por Pedido</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Detalle Financiero */}
            <div className="row">
              <div className="col-md-6">
                <div className="report-section">
                  <h6>Detalle Financiero</h6>
                  <table className="table table-sm">
                    <tbody>
                      <tr>
                        <td>Ventas Brutas (sin IVA):</td>
                        <td><strong>{formatCurrency(reportData.grossSales)}</strong></td>
                      </tr>
                      <tr>
                        <td>IVA Total (15%):</td>
                        <td><strong>{formatCurrency(reportData.netSales - reportData.grossSales)}</strong></td>
                      </tr>
                      <tr className="table-success">
                        <td><strong>Ventas Netas (con IVA):</strong></td>
                        <td><strong>{formatCurrency(reportData.netSales)}</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="col-md-6">
                <div className="report-section">
                  <h6>Distribución por Estado</h6>
                  <table className="table table-sm">
                    <tbody>
                      {Object.entries(reportData.salesByStatus).map(([status, data]) => (
                        <tr key={status}>
                          <td>
                            <span className={`badge bg-${getStatusColor(status)}`}>{status}</span>
                          </td>
                          <td><strong>{data.count} pedidos</strong></td>
                          <td><strong>{formatCurrency(data.total)}</strong></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Top Productos */}
            {reportData.topProducts.length > 0 && (
              <div className="report-section">
                <h6>🏆 Top 10 Productos Más Vendidos</h6>
                <div className="table-responsive">
                  <table className="table table-striped table-sm">
                    <thead>
                      <tr>
                        <th>Ranking</th>
                        <th>Código</th>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Pedidos</th>
                        <th>Total Ventas</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reportData.topProducts.map((product, index) => (
                        <tr key={product.code}>
                          <td>
                            <span className={`ranking-badge rank-${index + 1}`}>
                              {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                            </span>
                          </td>
                          <td><code>{product.code}</code></td>
                          <td>{product.name}</td>
                          <td><strong>{product.quantity} lb</strong></td>
                          <td>{product.orders} pedidos</td>
                          <td><strong>{formatCurrency(product.total)}</strong></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Top Clientes */}
            {reportData.clientAnalysis && reportData.clientAnalysis.length > 0 && (
              <div className="report-section">
                <h6>👥 Top 10 Mejores Clientes</h6>
                <div className="table-responsive">
                  <table className="table table-striped table-sm">
                    <thead>
                      <tr>
                        <th>Ranking</th>
                        <th>Cliente</th>
                        <th>Pedidos</th>
                        <th>Total Gastado</th>
                        <th>Promedio por Pedido</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reportData.clientAnalysis.map((client, index) => (
                        <tr key={client.id}>
                          <td>
                            <span className={`ranking-badge rank-${index + 1}`}>
                              {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                            </span>
                          </td>
                          <td>{client.name}</td>
                          <td>{client.orderCount}</td>
                          <td><strong>{formatCurrency(client.totalSpent)}</strong></td>
                          <td>{formatCurrency(client.avgOrder)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}

        {/* TAB: GRÁFICOS */}
        {activeTab === 'graficos' && (
          <div className="charts-section">
            <div className="row">
              <div className="col-md-6">
                {reportData.salesByDayOfWeek && (
                  <BarChartCSS 
                    data={reportData.salesByDayOfWeek} 
                    title="📊 Ventas por Día de la Semana"
                  />
                )}
              </div>
              <div className="col-md-6">
                {Object.keys(reportData.salesByStatus).length > 0 && (
                  <PieChartCSS 
                    data={reportData.salesByStatus} 
                    title="📈 Distribución por Estado"
                  />
                )}
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-md-6">
                {Object.keys(reportData.salesByPaymentMethod).length > 0 && (
                  <PieChartCSS 
                    data={reportData.salesByPaymentMethod} 
                    title="💳 Ventas por Método de Pago"
                  />
                )}
              </div>
              <div className="col-md-6">
                {reportData.topProducts.length > 0 && (
                  <div className="chart-container">
                    <h6 className="chart-title">🏆 Top 5 Productos por Ventas</h6>
                    <div className="bar-chart horizontal">
                      {reportData.topProducts.slice(0, 5).map((product, index) => {
                        const maxSales = reportData.topProducts[0]?.total || 1;
                        return (
                          <div key={product.code} className="bar-item">
                            <div className="bar-label">{product.name}</div>
                            <div className="bar-track">
                              <div 
                                className={`bar-fill rank-${index + 1}`}
                                style={{ width: `${(product.total / maxSales) * 100}%` }}
                              >
                                <span className="bar-value">{formatCurrency(product.total)}</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB: TENDENCIAS */}
        {activeTab === 'tendencias' && (
          <div className="trends-section">
            <h5>📈 Análisis de Tendencias</h5>
            <div className="trends-grid">
              <TrendCard 
                title="Crecimiento Semanal"
                value={`${reportData.trendsData.weeklyGrowth >= 0 ? '+' : ''}${reportData.trendsData.weeklyGrowth.toFixed(1)}%`}
                trend={reportData.trendsData.weeklyGrowth}
                icon={TrendingUp}
                color="primary"
              />
              <TrendCard 
                title="Tasa de Completado"
                value={`${reportData.trendsData.completionRate}%`}
                icon={Activity}
                color="success"
              />
              <TrendCard 
                title="Promedio Pedidos/Día"
                value={reportData.trendsData.avgOrdersPerDay}
                icon={Package}
                color="warning"
              />
              <TrendCard 
                title="Día Pico de Ventas"
                value={reportData.trendsData.peakDay}
                icon={Calendar}
                color="info"
              />
            </div>

            {/* Análisis adicional */}
            <div className="row mt-4">
              <div className="col-md-6">
                <div className="report-section insights-section">
                  <h6>💡 Insights Automáticos</h6>
                  <ul className="insights-list">
                    {reportData.trendsData.weeklyGrowth > 0 && (
                      <li className="insight positive">
                        <TrendingUp size={16} />
                        Las ventas han crecido un {reportData.trendsData.weeklyGrowth.toFixed(1)}% esta semana
                      </li>
                    )}
                    {reportData.trendsData.weeklyGrowth < 0 && (
                      <li className="insight negative">
                        <TrendingDown size={16} />
                        Las ventas han disminuido un {Math.abs(reportData.trendsData.weeklyGrowth).toFixed(1)}% esta semana
                      </li>
                    )}
                    {reportData.trendsData.completionRate >= 80 && (
                      <li className="insight positive">
                        <Activity size={16} />
                        Excelente tasa de completado: {reportData.trendsData.completionRate}%
                      </li>
                    )}
                    {reportData.trendsData.completionRate < 50 && (
                      <li className="insight warning">
                        <Activity size={16} />
                        La tasa de completado es baja: {reportData.trendsData.completionRate}%
                      </li>
                    )}
                    <li className="insight info">
                      <Calendar size={16} />
                      El día con más ventas es: {reportData.trendsData.peakDay}
                    </li>
                    {reportData.topProducts[0] && (
                      <li className="insight info">
                        <Package size={16} />
                        Producto estrella: {reportData.topProducts[0].name}
                      </li>
                    )}
                  </ul>
                </div>
              </div>
              <div className="col-md-6">
                <div className="report-section">
                  <h6>📊 Métricas Clave (KPIs)</h6>
                  <div className="kpi-grid">
                    <div className="kpi-item">
                      <span className="kpi-label">Ticket Promedio</span>
                      <span className="kpi-value">{formatCurrency(reportData.averageOrderValue)}</span>
                    </div>
                    <div className="kpi-item">
                      <span className="kpi-label">Productos/Pedido</span>
                      <span className="kpi-value">
                        {reportData.totalOrders > 0 ? (reportData.totalProducts / reportData.totalOrders).toFixed(1) : 0}
                      </span>
                    </div>
                    <div className="kpi-item">
                      <span className="kpi-label">Margen IVA</span>
                      <span className="kpi-value">{formatCurrency(reportData.netSales - reportData.grossSales)}</span>
                    </div>
                    <div className="kpi-item">
                      <span className="kpi-label">Clientes Únicos</span>
                      <span className="kpi-value">{reportData.clientAnalysis?.length || 0}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: DETALLES */}
        {activeTab === 'detalles' && (
          <>
            {/* Lista de Pedidos Filtrados */}
            {filteredOrders.length > 0 ? (
              <div className="report-section">
                <h6>📋 Pedidos Incluidos en el Reporte ({filteredOrders.length})</h6>
                <div className="table-responsive">
                  <table className="table table-striped table-sm table-hover">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Fecha</th>
                        <th>Cliente</th>
                        <th>Productos</th>
                        <th>Estado</th>
                        <th>Método Pago</th>
                        <th>Subtotal</th>
                        <th>IVA</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrders.map((order) => (
                        <tr key={order.id}>
                          <td><strong>#{order.id}</strong></td>
                          <td>{formatDate(order.date || order.createdAt)}</td>
                          <td>{order.client && order.client.name ? order.client.name : 'Cliente no especificado'}</td>
                          <td>{order.products?.length || 0} items</td>
                          <td>
                            <span className={`badge bg-${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                          </td>
                          <td>{order.paymentMethod || 'Efectivo'}</td>
                          <td>{formatCurrency(order.subtotal || 0)}</td>
                          <td>{formatCurrency((order.total || 0) - (order.subtotal || 0))}</td>
                          <td><strong>{formatCurrency(order.total || 0)}</strong></td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="table-success">
                        <td colSpan="6"><strong>TOTALES</strong></td>
                        <td><strong>{formatCurrency(reportData.grossSales)}</strong></td>
                        <td><strong>{formatCurrency(reportData.netSales - reportData.grossSales)}</strong></td>
                        <td><strong>{formatCurrency(reportData.netSales)}</strong></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            ) : (
              <div className="empty-state">
                <FileSpreadsheet size={48} />
                <h4>No hay pedidos que mostrar</h4>
                <p>Ajusta los filtros para ver resultados</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );

  function getStatusColor(status) {
    const colors = {
      'Pendiente': 'warning',
      'En Proceso': 'primary',
      'En Espera': 'info',
      'Completado': 'success',
      'Cancelado': 'danger'
    };
    return colors[status] || 'secondary';
  }
};

export default OrderReport;
