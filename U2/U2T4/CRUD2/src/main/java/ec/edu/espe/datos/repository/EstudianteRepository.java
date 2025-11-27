package ec.edu.espe.datos.repository;

import ec.edu.espe.datos.model.Estudiante;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class EstudianteRepository {
	private final List<Estudiante> estudiantes = new ArrayList<>();

	public EstudianteRepository() {
	}

	public boolean agregar(Estudiante estudiante) {
		if (existsById(estudiante.getId())) {
			return false;
		}
		return estudiantes.add(estudiante);
	}

	public boolean editar(Estudiante estudiante) {
		Estudiante existing = getById(estudiante.getId());
		if (existing == null) {
			return false;
		}
		existing.setNombres(estudiante.getNombres());
		existing.setEdad(estudiante.getEdad());
		return true;
	}

	public boolean eliminar(String id) {
		Estudiante existing = getById(id);
		if (existing == null) {
			return false;
		}
		return estudiantes.remove(existing);
	}

	public List<Estudiante> listar() {
		return Collections.unmodifiableList(new ArrayList<>(estudiantes));
	}

	public boolean existsById(String id) {
		return getById(id) != null;
	}

	public Estudiante getById(String id) {
		for (Estudiante e : estudiantes) {
			if (e.getId() != null && e.getId().equals(id)) {
				return e;
			}
		}
		return null;
	}
}
