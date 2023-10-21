import { useEffect, useState } from 'react';
import './App.css';
import { Auth } from "./components/auth";
import { db, auth, storage } from './config/firebase';
import { 
  getDocs, 
  collection, 
  addDoc, 
  deleteDoc, 
  updateDoc,
  doc } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';

function App() {
  const [movieList, setMovieList] = useState([]);
  const moviesCollectionRef = collection(db, 'movies');

  // New movie states
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);

  // Update title state
  const [updatedTitle, setUpdatedTitle] = useState("");

  // File upload state
  const [fileUpload, setFileUpload] = useState(null);

  const getMovieList = async () => {
    try {
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc) => ({...doc.data(), id: doc.id}));      
      setMovieList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getMovieList();
  }, []);

  const submitMovie = async (id) => {
    try {
      await addDoc(moviesCollectionRef, {
        title: newMovieTitle, 
        releasedDate: newReleaseDate, 
        receivedAnOscar: isNewMovieOscar
      })
      getMovieList();
    } catch (err) {
      console.error(err);
    }
  }

  const updateMovieTitle = async (id) => {
    try {
      const movieDoc = doc(db, "movies", id);
      await updateDoc(movieDoc, {title: updatedTitle});
    } catch (err) {
      console.error(err);
    }
  }

  const uploadFile = async () => {
    if (!fileUpload) return;
    const filesFolderRef = ref(storage, `imgs/${fileUpload.name}`);
    try {
      await uploadBytes(filesFolderRef, fileUpload)
    } catch (err) {
      console.error(err);
    }
  }

  const deleteMovie = async (id) => {
    try {
      const movieDoc = doc(db, "movies", id);
      await deleteDoc(movieDoc);

    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className='App'>
      <Auth />

      <div>
        <input 
          placeholder='Movie title...' 
          onChange={(e) => setNewMovieTitle(e.target.value)}
        />

        <input 
          placeholder='Release date...' 
          type='number'
          onChange={(e) => setNewReleaseDate(e.target.value)}
        />
        
        <input 
          type='checkbox'
          onChange={(e) => setIsNewMovieOscar(e.target.checked)}
        />
        <label>Received an Oscar</label>
        <button onClick={submitMovie}>Submit movie</button>
      </div>

      <div>
        {movieList.map((movie) => (
          <div key={movie.id}>
            <h1> {movie.title} </h1>
            <p> {movie.releasedDate} </p>
            <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>
            <input 
              placeholder='newTitle' 
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />
            <button onClick={() => updateMovieTitle(movie.id)}>Update Title</button>
          </div>
        ))}
      </div>

      <div>
        <input type="file" onChange={(e) => setFileUpload(e.target.files[0])}/>
        <button onClick={uploadFile}>Upload file</button>
      </div>
    </div>
  )
}

export default App;
