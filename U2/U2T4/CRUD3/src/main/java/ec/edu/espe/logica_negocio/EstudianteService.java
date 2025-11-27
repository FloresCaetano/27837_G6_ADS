package ec.edu.espe.logica_negocio;

import ec.edu.espe.datos.model.Estudiante;
import ec.edu.espe.datos.repository.EstudianteRepository;

import java.util.List;

public class EstudianteService {

	private final EstudianteRepository repository;

	public EstudianteService(EstudianteRepository repository) {
		this.repository = repository;
	}

	public String agregar(Estudiante estudiante) {
		if (estudiante == null) {
			return "Estudiante nulo";
		}
		if (estudiante.getId() == null || estudiante.getId().trim().isEmpty()) {
			return "ID es obligatorio";
		}
		if (estudiante.getNombres() == null || estudiante.getNombres().trim().isEmpty()) {
			return "Nombres son obligatorios";
		}
		if (estudiante.getEdad() <= 0) {
			return "Edad debe ser mayor que 0";
		}
		if (repository.existsById(estudiante.getId())) {
			return "ID ya existe";
		}
		boolean ok = repository.agregar(estudiante);
		return ok ? "OK" : "Error al agregar";
	}

	public String editar(Estudiante estudiante) {
		if (estudiante == null || estudiante.getId() == null || estudiante.getId().trim().isEmpty()) {
			return "ID es obligatorio";
		}
		if (estudiante.getEdad() <= 0) {
			return "Edad debe ser mayor que 0";
		}
		boolean ok = repository.editar(estudiante);
		return ok ? "OK" : "No existe estudiante con ese ID";
	}

	public String eliminar(String id) {
		if (id == null || id.trim().isEmpty()) {
			return "ID es obligatorio";
		}
		boolean ok = repository.eliminar(id);
		return ok ? "OK" : "No existe estudiante con ese ID";
	}

	public List<Estudiante> listar() {
		return repository.listar();
	}
}
