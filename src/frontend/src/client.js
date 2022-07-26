import fetch from 'unfetch';

 const checkStatus = response => {
    if (response.ok) {
        return response;
    } else {
        const error = new Error(response.statusText);
        error.response = response;
        return Promise.reject(error);
    }
  
}

export const getStudents = () =>
    fetch("api/v1/students")
        .then(checkStatus);

 export const addNewStudent = student =>

     fetch("api/v1/students", {
         headers: {
             'Content-Type' : 'application/json'
         },
         method : 'POST',
         body: JSON.stringify(student)
         }).then(checkStatus);

 export const deleteStudent = studentID =>
     fetch (`api/v1/students/${studentID}`, {
        method : 'DELETE',
        }).then(checkStatus);