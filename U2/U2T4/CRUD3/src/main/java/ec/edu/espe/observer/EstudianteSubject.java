package ec.edu.espe.observer;

public interface EstudianteSubject {
	void agregarObservador(EstudianteObserver observer);
	void removerObservador(EstudianteObserver observer);
}
