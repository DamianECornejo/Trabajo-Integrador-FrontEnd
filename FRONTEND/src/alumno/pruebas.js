componentDidMount() {
    //let request = {
      //method: 'GET',
      //headers: {
        //'Content-Type': 'application/json',
        //"Accept": 'application/json',
        //"authorization":sessionStorage.getItem('token')
      //}
    //}; 
    fetch("http://localhost:8080/api/alumno")
    .then(res => {
      return res.json().then(body => {
        return {
          status: res.status,
          ok: res.ok,
          headers: res.headers,
          body: body
        };
      });
    })
      .then(result => {
        if (result.ok) {
          this.setState({
            modalConfirmarEliminacion: false,
            alumno: result.body
          });
        } else {
          toast.error(result.body.message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
        
      },
        (error) => {
          console.log(error);
          this.setState({ 
            error,
            alumno: [],
            modalConfirmarEliminacion: false
          });
        }
      )
  }