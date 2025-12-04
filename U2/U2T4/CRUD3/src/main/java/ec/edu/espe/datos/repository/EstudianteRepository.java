package ec.edu.espe.datos.repository;

import ec.edu.espe.datos.model.Estudiante;
import ec.edu.espe.observer.EstudianteObserver;
import ec.edu.espe.observer.EstudianteSubject;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class EstudianteRepository implements EstudianteSubject {
	private final List<Estudiante> estudiantes = new ArrayList<>();
	private final List<EstudianteObserver> observadores = new ArrayList<>();

	public EstudianteRepository() {
	}

	@Override
	public void agregarObservador(EstudianteObserver observer) {
		observadores.add(observer);
	}

	@Override
	public void removerObservador(EstudianteObserver observer) {
		observadores.remove(observer);
	}


	private void notificarAgregado(Estudiante estudiante) {
		for (EstudianteObserver observer : observadores) {
			observer.onEstudianteAgregado(estudiante);
		}
	}

	private void notificarEditado(Estudiante estudiante) {
		for (EstudianteObserver observer : observadores) {
			observer.onEstudianteEditado(estudiante);
		}
	}

	private void notificarEliminado(String id) {
		for (EstudianteObserver observer : observadores) {
			observer.onEstudianteEliminado(id);
		}
	}

	public boolean agregar(Estudiante estudiante) {
		if (existsById(estudiante.getId())) {
			return false;
		}
		boolean resultado = estudiantes.add(estudiante);
		if (resultado) {
			notificarAgregado(estudiante);
		}
		return resultado;
	}

	public boolean editar(Estudiante estudiante) {
		Estudiante existing = getById(estudiante.getId());
		if (existing == null) {
			return false;
		}
		existing.setNombres(estudiante.getNombres());
		existing.setEdad(estudiante.getEdad());
		notificarEditado(estudiante);
		return true;
	}

	public boolean eliminar(String id) {
		Estudiante existing = getById(id);
		if (existing == null) {
			return false;
		}
		boolean resultado = estudiantes.remove(existing);
		if (resultado) {
			notificarEliminado(id);
		}
		return resultado;
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
