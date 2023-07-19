import React, { Fragment, useContext, useState } from "react";
import "./Create.css";
import Header from "../Header/Header";
import firebase from "../../firebase/config";
import { AuthContext } from "../../store/Context";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import {getDownloadURL, getStorage, ref, uploadBytes} from 'firebase/storage'

const Create = () => {

  const {user} = useContext(AuthContext)
  const navigate = useNavigate()
  const firestore = getFirestore(firebase)
  const firestorage = getStorage(firebase)
  

  // useState
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState();
  const [imageUrl, setImageUrl] = useState();

  const handleImage = (e)=>{
    const file = e.target.files[0]

    const blob = new Blob([file],{type: file.type})
    setImage(file)

    const reader = new FileReader()
    reader.onload =()=>{
      const url = reader.result
      setImageUrl(url)
    }
    reader.readAsDataURL(blob)
  }

  // submit and upload function

  const handleSubmit = (e)=>{
    const date = new Date()
    if (user) {
      const storage = ref(firestorage,`/image/${image.name}`)
      const imageBlob = new Blob([image],{type: image.type})
      uploadBytes(storage,imageBlob).then((response)=>{
        console.log('uploaded');
        getDownloadURL(storage).then(async(url)=>{
          console.log(url);
          await addDoc(collection(firestore,'products'),{
            name: name,
            category: category,
            price: price,
            image: url,
            createdDate: date.toDateString(),
            userId: user.id
          })
          console.log("Success");
          navigate('/')
        })
      })
    }else{
      console.log('User not logged in');
    }
  }


  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              id="fname"
              name="Name"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              type="text"
              id="fname"
              name="category"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input 
            className="input"
            value={price}
            onChange={(e) => setPrice(e.target.value)} type="number" id="fname" name="Price" />
            <br />
          
          <br />
          <img alt="Posts" width="200px" height="200px" src={imageUrl ? imageUrl : ""}></img>
          
          <br />
          <input onChange={handleImage} type="file" />
          <br /> 
          <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
          
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
