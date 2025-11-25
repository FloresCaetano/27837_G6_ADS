package ec.edu.espe.presentacion;

import ec.edu.espe.datos.model.Estudiante;
import ec.edu.espe.logica_negocio.EstudianteService;

import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.util.List;

public class EstudianteUI extends JFrame {

	private final EstudianteService service = new EstudianteService();

	private JTextField txtId;
	private JTextField txtNombres;
	private JTextField txtEdad;
	private JButton btnGuardar;
	private JButton btnEditar;
	private JButton btnEliminar;
	private JButton btnListar;
	private JTable table;
	private DefaultTableModel tableModel;

	public EstudianteUI() {
		initComponents();
	}

	private void initComponents() {
		setTitle("CRUD Estudiantes");
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		setSize(600, 400);
		setLocationRelativeTo(null);

		JPanel panelForm = new JPanel(new GridBagLayout());
		GridBagConstraints gbc = new GridBagConstraints();
		gbc.insets = new Insets(4, 4, 4, 4);
		gbc.anchor = GridBagConstraints.WEST;

		gbc.gridx = 0;
		gbc.gridy = 0;
		panelForm.add(new JLabel("ID:"), gbc);
		gbc.gridx = 1;
		txtId = new JTextField(15);
		panelForm.add(txtId, gbc);

		gbc.gridx = 0;
		gbc.gridy = 1;
		panelForm.add(new JLabel("Nombres:"), gbc);
		gbc.gridx = 1;
		txtNombres = new JTextField(20);
		panelForm.add(txtNombres, gbc);

		gbc.gridx = 0;
		gbc.gridy = 2;
		panelForm.add(new JLabel("Edad:"), gbc);
		gbc.gridx = 1;
		txtEdad = new JTextField(5);
		panelForm.add(txtEdad, gbc);

		JPanel panelButtons = new JPanel(new FlowLayout(FlowLayout.LEFT));
		btnGuardar = new JButton("Guardar");
		btnEditar = new JButton("Editar");
		btnEliminar = new JButton("Eliminar");
		btnListar = new JButton("Listar");
		panelButtons.add(btnGuardar);
		panelButtons.add(btnEditar);
		panelButtons.add(btnEliminar);
		panelButtons.add(btnListar);

		gbc.gridx = 0;
		gbc.gridy = 3;
		gbc.gridwidth = 2;
		panelForm.add(panelButtons, gbc);

		tableModel = new DefaultTableModel(new Object[]{"ID", "Nombres", "Edad"}, 0) {
			@Override
			public boolean isCellEditable(int row, int column) {
				return false;
			}
		};
		table = new JTable(tableModel);
		JScrollPane scrollPane = new JScrollPane(table);

		getContentPane().setLayout(new BorderLayout());
		getContentPane().add(panelForm, BorderLayout.NORTH);
		getContentPane().add(scrollPane, BorderLayout.CENTER);

		addListeners();
		refreshTable();
	}

	private void addListeners() {
		btnGuardar.addActionListener(e -> onGuardar());
		btnEditar.addActionListener(e -> onEditar());
		btnEliminar.addActionListener(e -> onEliminar());
		btnListar.addActionListener(e -> refreshTable());

		table.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				int row = table.getSelectedRow();
				if (row >= 0) {
					txtId.setText((String) tableModel.getValueAt(row, 0));
					txtNombres.setText((String) tableModel.getValueAt(row, 1));
					txtEdad.setText(String.valueOf(tableModel.getValueAt(row, 2)));
				}
			}
		});
	}

	private void onGuardar() {
		String id = txtId.getText().trim();
		String nombres = txtNombres.getText().trim();
		int edad;
		try {
			edad = Integer.parseInt(txtEdad.getText().trim());
		} catch (NumberFormatException ex) {
			JOptionPane.showMessageDialog(this, "Edad inválida", "Error", JOptionPane.ERROR_MESSAGE);
			return;
		}
		Estudiante estudiante = new Estudiante(id, nombres, edad);
		String result = service.agregar(estudiante);
		if ("OK".equals(result)) {
			JOptionPane.showMessageDialog(this, "Estudiante guardado");
			clearForm();
			refreshTable();
		} else {
			JOptionPane.showMessageDialog(this, result, "Error", JOptionPane.ERROR_MESSAGE);
		}
	}

	private void onEditar() {
		String id = txtId.getText().trim();
		String nombres = txtNombres.getText().trim();
		int edad;
		try {
			edad = Integer.parseInt(txtEdad.getText().trim());
		} catch (NumberFormatException ex) {
			JOptionPane.showMessageDialog(this, "Edad inválida", "Error", JOptionPane.ERROR_MESSAGE);
			return;
		}
		Estudiante estudiante = new Estudiante(id, nombres, edad);
		String result = service.editar(estudiante);
		if ("OK".equals(result)) {
			JOptionPane.showMessageDialog(this, "Estudiante actualizado");
			clearForm();
			refreshTable();
		} else {
			JOptionPane.showMessageDialog(this, result, "Error", JOptionPane.ERROR_MESSAGE);
		}
	}

	private void onEliminar() {
		String id = txtId.getText().trim();
		String result = service.eliminar(id);
		if ("OK".equals(result)) {
			JOptionPane.showMessageDialog(this, "Estudiante eliminado");
			clearForm();
			refreshTable();
		} else {
			JOptionPane.showMessageDialog(this, result, "Error", JOptionPane.ERROR_MESSAGE);
		}
	}

	private void refreshTable() {
		List<Estudiante> estudiantes = service.listar();
		tableModel.setRowCount(0);
		for (Estudiante e : estudiantes) {
			tableModel.addRow(new Object[]{e.getId(), e.getNombres(), e.getEdad()});
		}
	}

	private void clearForm() {
		txtId.setText("");
		txtNombres.setText("");
		txtEdad.setText("");
	}
}
