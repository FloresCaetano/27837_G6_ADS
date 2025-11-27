package ec.edu.espe.observer;

import ec.edu.espe.datos.model.Estudiante;

public interface EstudianteObserver {
	void onEstudianteAgregado(Estudiante estudiante);
	void onEstudianteEditado(Estudiante estudiante);
	void onEstudianteEliminado(String id);
}
