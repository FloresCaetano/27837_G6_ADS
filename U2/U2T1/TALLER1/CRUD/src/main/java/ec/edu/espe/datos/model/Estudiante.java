package ec.edu.espe.datos.model;

import java.util.Objects;

public class Estudiante {
	private String id;
	private String nombres;
	private int edad;

	public Estudiante() {
	}

	public Estudiante(String id, String nombres, int edad) {
		this.id = id;
		this.nombres = nombres;
		this.edad = edad;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getNombres() {
		return nombres;
	}

	public void setNombres(String nombres) {
		this.nombres = nombres;
	}

	public int getEdad() {
		return edad;
	}

	public void setEdad(int edad) {
		this.edad = edad;
	}

	@Override
	public String toString() {
		return "Estudiante{" + "id='" + id + '\'' + ", nombres='" + nombres + '\'' + ", edad=" + edad + '}';
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (!(o instanceof Estudiante)) return false;
		Estudiante that = (Estudiante) o;
		return Objects.equals(id, that.id);
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}
}
