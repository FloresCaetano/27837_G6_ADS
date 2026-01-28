import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Package, Users, ShoppingCart, Blend, User, Shield, RotateCcw } from 'lucide-react';
import './Sidebar.css';

    const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isClientMode, setIsClientMode] = useState(false);

    // Cargar el modo desde localStorage al iniciar
    useEffect(() => {
        const savedMode = localStorage.getItem('viewMode');
        if (savedMode === 'client') {
            setIsClientMode(true);
        }
    }, []);

    // Redirigir al cliente a la mezcla personalizada si está en otra página
    useEffect(() => {
        if (isClientMode && location.pathname !== '/mezcla-personalizada') {
            navigate('/mezcla-personalizada');
        }
    }, [isClientMode, location.pathname, navigate]);

    // Escuchar combinación de teclas para volver al modo admin (Ctrl + Alt + A)
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.ctrlKey && event.altKey && event.key === 'a' && isClientMode) {
                setIsClientMode(false);
                localStorage.setItem('viewMode', 'admin');
                // Opcional: mostrar una notificación
                console.log('Modo administrador activado');
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isClientMode]);

    // Guardar el modo en localStorage cuando cambie
    const toggleMode = () => {
        const newMode = !isClientMode;
        setIsClientMode(newMode);
        localStorage.setItem('viewMode', newMode ? 'client' : 'admin');
        
        // Si cambio a modo cliente, redirigir a mezcla personalizada
        if (newMode) {
            navigate('/mezcla-personalizada');
        }
    };

    // Función para volver al modo admin desde el modo cliente (doble clic en el logo)
    const handleAdminReturn = () => {
        if (isClientMode) {
            setIsClientMode(false);
            localStorage.setItem('viewMode', 'admin');
        }
    };

    // Definir menús según el modo
    const adminMenuItems = [
        {
        path: '/productos',
        icon: Package,
        label: 'Productos',
        description: 'Gestionar frutos secos'
        },
        {
        path: '/clientes',
        icon: Users,
        label: 'Clientes',
        description: 'Administrar base de clientes'
        },
        {
        path: '/pedidos',
        icon: ShoppingCart,
        label: 'Pedidos',
        description: 'Gestionar órdenes y ventas'
        },
        {
        path: '/mezcla-personalizada',
        icon: Blend,
        label: 'Mezcla Personalizada',
        description: 'Crear mezclas únicas'
        }
    ];

    const clientMenuItems = [
        {
        path: '/mezcla-personalizada',
        icon: Blend,
        label: 'Diseñar Mezcla',
        description: 'Crear tu mezcla personalizada'
        }
    ];

    const menuItems = isClientMode ? clientMenuItems : adminMenuItems;

    return (
        <aside className={`sidebar ${isClientMode ? 'client-mode' : ''}`}>
        <div className="sidebar-header">
            <h1 
                className="sidebar-title"
                onDoubleClick={handleAdminReturn}
                style={{ cursor: isClientMode ? 'pointer' : 'default' }}
                title={isClientMode ? 'Doble clic para volver al modo administrador' : ''}
            >
            <span className="brand-icon">🌰</span>
            KairosMix
            </h1>
            <p className="sidebar-subtitle">
                {isClientMode ? 'Portal de Cliente' : 'Frutos Secos Premium'}
            </p>
            {isClientMode && (
                <div className="client-mode-badge">
                    <User size={16} />
                    <span>Modo Cliente</span>
                </div>
            )}
        </div>

        <nav className="sidebar-nav">
            {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
                <Link
                key={item.path}
                to={item.path}
                className={`nav-item ${isActive ? 'active' : ''}`}
                >
                <div className="nav-icon">
                    <IconComponent size={24} />
                </div>
                <div className="nav-content">
                    <div className="nav-label">{item.label}</div>
                    <div className="nav-description">{item.description}</div>
                </div>
                </Link>
            );
            })}
        </nav>

        <div className="sidebar-footer">
            <div className="user-info">
            <div className="user-avatar">
                <span>V</span>
            </div>
            <div className="user-details">
                <div className="user-name">
                    {isClientMode ? 'Cliente' : 'Vinicio Narvaez'}
                </div>
                <div className="user-role">
                    {isClientMode ? 'Vista Cliente' : 'Administrador'}
                </div>
            </div>
            </div>
            
            {/* Solo mostrar el botón de cambio de modo cuando NO esté en modo cliente */}
            {!isClientMode && (
                <button 
                    className="mode-toggle-btn"
                    onClick={toggleMode}
                    title="Cambiar a vista cliente"
                >
                    <User size={16} />
                    <span>Vista Cliente</span>
                </button>
            )}
        </div>
        </aside>
    );
    };

export default Sidebar;
