package ec.edu.espe.presentacion;

public class Main {
    public static void main(String[] args) {
        javax.swing.SwingUtilities.invokeLater(() -> {
            EstudianteUI ui = new EstudianteUI();
            ui.setVisible(true);
        });
    }
}
