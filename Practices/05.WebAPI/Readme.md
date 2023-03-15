# WebAPI
Implemente una aplicacion de tipo MVC, patra manipular los datos de los Studiantes, que consuma los datos de un servidor de tipo json-server, mediante el uso de REST.

## Json-Server
Utilizando el archivo en **JDATA.json** de la carpeta server, ejecute el siguiente comando para levantar el servidor en una ventana de terminal

```
cd server
json-server --watch JDATA.json
```

## MVC Application
Utilizando la aplicacion **SchoolMVC** consuma los datos del servidor JSON, mediante el uso de los Metodos REST.

### Adicionando el Modelo
En la carpeta de Models adiciona una nueva clase llamada **Students** asi:

```csharp
public class Student
{
    public int Id { get; set; } = 0;
    public string FirstName { get; set; } = null!;
    public string LastName { get; set; } = null!;
    public DateTime DateOfBirth { get; set; } = default!;
    public char Sex { get; set; } = 'M';
}
```
