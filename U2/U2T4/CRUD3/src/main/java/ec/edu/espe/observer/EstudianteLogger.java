package ec.edu.espe.observer;

import ec.edu.espe.datos.model.Estudiante;

public class EstudianteLogger implements EstudianteObserver {
	@Override
	public void onEstudianteAgregado(Estudiante estudiante) {
		System.out.println("[LOG] Estudiante agregado: " + estudiante);
	}

	@Override
	public void onEstudianteEditado(Estudiante estudiante) {
		System.out.println("[LOG] Estudiante editado: " + estudiante);
	}

	@Override
	public void onEstudianteEliminado(String id) {
		System.out.println("[LOG] Estudiante eliminado con ID: " + id);
	}
}
