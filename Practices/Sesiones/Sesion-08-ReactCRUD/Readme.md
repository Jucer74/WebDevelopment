# React - CRUD
Al igual que en la version de MVC veremos la impelmentacion del CRUD, para la creacion, actualizacion y eliminacion de registros.

# Creación de Usuarios
1. Mueva la definicion de la **baseUrl**  por fuera de la función.

2. Adicione a las librerias actuales el llamado a los componentes Modales de la libreria **reactstrap** así:

```js
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
```

2. Adicione el manejo de estado para obtner y almacenar los datos del usuario 

```js
// Control data
const [currentUser, setCurrentUser]= useState({
  id: '', 
  email: '',
  username: '',
  name: '',
  password: ''
});
```

3. Adicione el manejador de cambio para los camos que seran digitados en los datos de los formularios 

```js
const handleChange=e=>{
const {name, value}= e.target;
setCurrentUser({
  ...currentUser,
  [name]: value
})
}
```

4. Adicione el manej de estado para saber cuando mostrar o no la ventana modal relacionada con la creación de usuarios.

```js
// Create 
const [showModalCreate, setShowModalCreate]= useState(false);
const openCloseModalCreate=()=>{
 setShowModalCreate(!showModalCreate);
}  
```

5. Ahora adicione el metodo para obtner los datos de los usuarios desde la API.

```js
const postUser = async() => {
  delete currentUser.id;
  await axios.post(baseUrl, currentUser)
  .then (response=>{
    getUsers();
    openCloseModalCreate();
  }).catch(error=>{
    console.log(error);
  })
}
```

6. Adicione el componente **Form** para el manejo de formularios.

```js
import { Button, Container, Table, Form } from 'react-bootstrap';
```  

7. Adicione el Formulario modal para poder capturar los nuevos datos

```js
{/* Create */}
<Modal isOpen={showModalCreate}>
  <ModalHeader>Create User</ModalHeader>
  <ModalBody>
    <Form>
      <Form.Group>
        <Form.Label>Email:</Form.Label>
        <Form.Control type="email" id="txtEmail" name="email" placeholder="username@domain.com" required onChange={handleChange}/>
      </Form.Group>
      <Form.Group>
        <Form.Label>Name:</Form.Label>
        <Form.Control type="text" id="txtName" name="name" placeholder="Julio Robles" required onChange={handleChange}/>
      </Form.Group>
      <Form.Group>
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" id="txtUsername" name="username" placeholder="username" required onChange={handleChange}/>
      </Form.Group>
      <Form.Group>
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" id="txtPassword" name="password"  onChange={handleChange}/>
      </Form.Group>
    </Form>
  </ModalBody>
  <ModalFooter>
    <Button variant="primary" onClick={()=>postUser()}>Create</Button>
    <Button variant="outline-info" onClick={()=>openCloseModalCreate()}>Back</Button>
  </ModalFooter>
</Modal>

```

- En la declaracion del modal incluya el llamado al estado **showModalCreate**  asignelo a la propiedad **isOpen**.
- Asegurese que cada control (**Form.Control**) tenga la popiedad **name** y que cada valor correspondiente haga referencia a los nombres de los campos declarados para el **currentUser**
- Adicione el evento **onChange** y asignele la función **handleChange**
- En el botón **Save** adicione el llamado a la funcion **postUser** en el evento **onClick**
- En el botón **Back** en el evento **onClick** haga el llamado a la función **openCloseModalCreate**

8. Ahora adicione el llamado a la ventana modal desde el botón de **New User** asignado la función **openCloseModalCreate** an evento **onClick** de dicho botón.

```js
<Button className="left" variant="success btn-sm" onClick={()=>openCloseModalCreate()}> <Fas icon={faPlus} /> New</Button>
```

## Editar Usuario
1. Al igual que en la accion de **New User** cree un nuevo estado para abrir y cerrar el modal

```js
// Update
const [showModalUpdate, setShowModalUpdate]= useState(false);
const openCloseModalUpdate=()=>{
  setShowModalUpdate(!showModalUpdate);
}
```

2. Adicione el metodo que permita seleccionar los datos del usuario actual

```js
const selectCurrentUser=(user, action)=>{
setCurrentUser(user);
switch (action) {
  case "Edit":
    openCloseModalUpdate();
    break;
  default:
    break;
}     
}
```

3. Adicione el metodo para obtener guardar los datos del usuario haciendo el llamado al metodo **PUT**

```js
const putUser = async() => {
  await axios.put(baseUrl+"/"+ currentUser.id, currentUser)
  .then (response=>{
    var result = response.data;
    var updatedData = data;
    updatedData.map(usr=>{
      if(usr.id===currentUser.id){
        usr.email = result.email;
        usr.name = result.name;
        usr.username = result.username;
        usr.password = result.password;
      }
    });
	getUsers();
    openCloseModalUpdate();
  }).catch(error=>{
    console.log(error);
  })
}
```

4. Modifique el llamado del botón **Edit** para que permita seleccionar los datos y abrir el modal

```js
<Button variant="outline-primary" onClick={()=>selectCurrentUser(usr, "Edit")}>Edit</Button>{"  "}
```

- Tenga presente que se hace llamado a la función **selectCurrentUser** y se le pasan los datos del usuario actual las la accion **Edit**

5. Adicione el Modal para la captura de datos y los llamados correspondintes a las acciones para ello.

```js
{/* Update */}
<Modal isOpen={showModalUpdate}>
  <ModalHeader>Edit User</ModalHeader>
  <ModalBody>
    <Form>
      <Form.Group>
        <Form.Label>Id:</Form.Label>
        <Form.Control type="text" id="txtId" name="id" readOnly value={currentUser && currentUser.id}/>
      </Form.Group>
      <Form.Group>
        <Form.Label>Email:</Form.Label>
        <Form.Control type="email" id="txtEmail" name="email" placeholder="username@domain.com" required onChange={handleChange}  value={currentUser && currentUser.email}/>
      </Form.Group>
      <Form.Group>
        <Form.Label >Name:</Form.Label>
        <Form.Control type="text" id="txtName" name="name" placeholder="Julio Robles" required onChange={handleChange}  value={currentUser && currentUser.name}/>
      </Form.Group>
      <Form.Group>
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" id="txtUsername" name="username" placeholder="username" required onChange={handleChange}  value={currentUser && currentUser.username}/>
      </Form.Group>
      <Form.Group>
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" id="txtPassword" name="password"  onChange={handleChange}  value={currentUser && currentUser.password}/>
      </Form.Group>
    </Form>
  </ModalBody>
  <ModalFooter>
    <Button variant="primary" onClick={()=>putUser()}>Save</Button>
    <Button variant="outline-info" onClick={()=>openCloseModalUpdate()}>Back</Button>
  </ModalFooter>
</Modal>

```

## Detalles de Usuario
1. Adicione el manejo del estado para obtenr los detalles

```js
// Details
const [showModalDetails, setShowModalDetails]= useState(false);
const openCloseModalDetails=()=>{
  setShowModalDetails(!showModalDetails);
}
```

2. Adicione la ventana modal para mostrar los datos del usuario.

```js
{/* Details */}
<Modal isOpen={showModalDetails}>
  <ModalHeader>Details User</ModalHeader>
  <ModalBody>
    <Form>
      <Form.Group>
        <Form.Label>Id:</Form.Label>
        <Form.Control type="text" id="txtId" name="id" readOnly value={currentUser && currentUser.id}/>
      </Form.Group>
      <Form.Group>
        <Form.Label>Email:</Form.Label>
        <Form.Control type="email" id="txtEmail" name="email" readOnly value={currentUser && currentUser.email}/>
      </Form.Group>
      <Form.Group>
        <Form.Label>Name:</Form.Label>
        <Form.Control type="text" id="txtName" name="name" readOnly value={currentUser && currentUser.name}/>
      </Form.Group>
      <Form.Group>
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" id="txtUsername" name="username" readOnly value={currentUser && currentUser.username}/>
      </Form.Group>
      <Form.Group>
        <Form.Label>Password:</Form.Label>
        <Form.Control type="text" id="txtPassword" name="password" readOnly value={currentUser && currentUser.password}/>
      </Form.Group>
    </Form>
  </ModalBody>
  <ModalFooter>
    <Button variant="outline-info" onClick={()=>openCloseModalDetails()}>Back</Button>
  </ModalFooter>
</Modal>

```

- En este caso no se requiere hacer llamado a ninguna función del API, pues ya se tiene los datos en la vble **data**

3. Modifique el llamado del botón **Details** para mostrar la ventana modal.

```js
<Button variant="outline-warning" onClick={()=>selectCurrentUser(usr, "Details")}>Details</Button>{"  "}
```
4. Adicione la condicion al metodo de **selectCurrentUser** haciendo llamado a la acción **Details**

```js
const selectCurrentUser=(user, action)=>{
  setCurrentUser(user);
  switch (action) {
    case "Edit":
      openCloseModalUpdate();
      break;
    case "Details":
      openCloseModalDetails();
      break;
    default:
      break;
  }     
}
```


## Eliminar usuario
1. Adicione el estado para manejar la ventana Modal

```js
  // Delete
  const [showModalDelete, setShowModalDelete]= useState(false);
  const openCloseModalDelete=()=>{
    setShowModalDelete(!showModalDelete);
  }

```

2. Cree la funcion para hacer el llamado a la API, para accion **Delete**

```js
const deleteUser = async() => {
  await axios.delete(baseUrl+"/"+ currentUser.id)
  .then (()=>{
    setData(data.filter(usr=>usr.id!==currentUser.id));
    openCloseModalDelete();
  }).catch(error=>{
    console.log(error);
  })
}  
````

3. Incluya el llamado al metodo **Delete** en el boton principal asignado para ello.

```js
<Button variant="outline-danger" onClick={()=>selectCurrentUser(usr, "Delete")}>Delete</Button>
```

4. Adicione la ventana modal para mostrar los datos y esperar la confirmación.

```js
{/* Delete */}
<Modal isOpen={showModalDelete}>
  <ModalHeader>Are you sure to delete this user?</ModalHeader>
  <ModalBody>
    <Form>
      <Form.Group>
        <Form.Label><b>Id:</b></Form.Label>
        <Form.Label>{currentUser && currentUser.id}</Form.Label><br/>
        <Form.Label><b>Email:</b></Form.Label>
        <Form.Label>{currentUser && currentUser.email}</Form.Label><br/>
        <Form.Label><b>Name:</b></Form.Label>
        <Form.Label>{currentUser && currentUser.name}</Form.Label><br/>
        <Form.Label><b>Username:</b></Form.Label>
        <Form.Label>{currentUser && currentUser.username}</Form.Label><br/>
      </Form.Group>
    </Form>
  </ModalBody>
  <ModalFooter>
    <Button variant="danger" onClick={()=>deleteUser(currentUser.id)}>Delete</Button>
    <Button variant="outline-info" onClick={()=>openCloseModalDelete()}>Back</Button>
  </ModalFooter>
</Modal>
```

5. Adiciona la acción al metodo **selectCurrentUSer**

```js
const selectCurrentUser=(user, action)=>{
  setCurrentUser(user);
  switch (action) {
    case "Edit":
      openCloseModalUpdate();
      break;
    case "Details":
      openCloseModalDetails();
      break;      
    case "Delete":
      openCloseModalDelete();
      break;             
    default:
      break;
  }     
}
```

Ahora probemos todo junto y veamos como funciona.