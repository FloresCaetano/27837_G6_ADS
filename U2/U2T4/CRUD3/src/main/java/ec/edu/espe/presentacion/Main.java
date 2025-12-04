package ec.edu.espe.presentacion;

import ec.edu.espe.datos.repository.EstudianteRepository;
import ec.edu.espe.logica_negocio.EstudianteService;
import ec.edu.espe.observer.EstudianteLogger;

public class Main {
    public static void main(String[] args) {
        // Crear el repositorio
        EstudianteRepository repository = new EstudianteRepository();
        
        // Registrar observadores
        EstudianteLogger logger = new EstudianteLogger();
        repository.agregarObservador(logger);

        // Crear el servicio con el repositorio
        EstudianteService service = new EstudianteService(repository);
        
        // Iniciar la UI con el servicio
        javax.swing.SwingUtilities.invokeLater(() -> {
            EstudianteUI ui = new EstudianteUI(service);
            ui.setVisible(true);
        });
    }
}
