package ec.edu.espe.datos.factory;

import ec.edu.espe.datos.repository.EstudianteRepository;

public abstract class AbstractRepositoryFactory {
	public abstract EstudianteRepository createEstudianteRepository();
}
