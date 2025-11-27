package ec.edu.espe.datos.factory;

import ec.edu.espe.datos.repository.EstudianteRepository;

public class RepositoryFactory extends AbstractRepositoryFactory {
	@Override
	public EstudianteRepository createEstudianteRepository() {
		return new EstudianteRepository();
	}
}
