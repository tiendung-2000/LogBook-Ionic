import { IonButton, IonContent, IonDatetime, IonHeader, IonInput, IonItem,  IonPage, IonText } from '@ionic/react';
import { useState } from 'react';
import { insertRoomRental } from '../databaseHandler';
import { toast } from '../toast';
import ReactAudioPlayer from 'react-audio-player';
import './Home.css';

const Home: React.FC = () => {
  const [propertyType, setProperty] = useState('')
  const [bedRooms, setBedRooms] = useState('')
  const [dateAndTime, setDateAndTime] = useState(new Date().toISOString())
  const [monthlyRentPrice, setMonthlyRentPrice] = useState('')
  const [furnitureType, setFurnitureType] = useState('')
  const [notes, setNotes] = useState('')
  const [name, setName] = useState('')

  async function validation() {
    if (propertyType.length === 0 || bedRooms.length === 0 || monthlyRentPrice.length === 0) {
      toast("Is not Empty!")
    }
    else if (isNaN(parseInt(monthlyRentPrice)) || parseInt(monthlyRentPrice) <=0 ) {
      toast("Only input number and it above 0$")
    }
    else {
      const newCus = {
        propertyType: propertyType,
        bedRooms: bedRooms,
        dateAndTime: dateAndTime,
        monthlyRentPrice: monthlyRentPrice,
        furnitureType: furnitureType,
        notes: notes,
        name: name
      }
      insertRoomRental(newCus).then(() => {
        alert("Done")
      })
    }
  }

  var myPlayer: ReactAudioPlayer | null

  return (
    <IonPage class="FS">
      <IonContent fullscreen>
        <IonHeader class="text-header">
          <IonText >LogBook Room RentalZ App</IonText>
        </IonHeader>

        <IonItem class="button-audio" lines="none">
          <ReactAudioPlayer src="assets\bell.mp3" ref={(element) => { myPlayer = element }}/>
          <IonButton color="success" size="large" onClick={() => myPlayer?.audioEl.current?.play()}>Play</IonButton>
          <IonButton color="danger" size="large" onClick={() => myPlayer?.audioEl.current?.pause()}>Pause</IonButton>
          <IonButton color="warning" size="large" onClick={() => navigator.vibrate(2500)}>Vibration</IonButton>
        </IonItem>

        <IonItem lines="none">
          <IonText class="text1">Property Types: </IonText>
          <IonInput class="login-text1" placeholder="House, Villas, ect." onIonChange={e => setProperty(e.detail.value!)}></IonInput>
        </IonItem>

        <IonItem lines="none">
          <IonText class="text2">Bedrooms: </IonText>
          <IonInput class="login-text2" placeholder="One, Two, etc." onIonChange={e => setBedRooms(e.detail.value!)}></IonInput>
        </IonItem>

        <IonItem lines="none">
          <IonText class="text3">Date and Time: </IonText>
          <IonDatetime class="login-text3" value={dateAndTime}
            onIonChange={e => setDateAndTime(e.detail.value!)}></IonDatetime>
        </IonItem>

        <IonItem lines="none">
          <IonText class="text4">Monthly Rent Price: </IonText>
          <IonInput class="login-text4" placeholder="Price($)/Month."onIonChange={e => setMonthlyRentPrice(e.detail.value!)}></IonInput>
        </IonItem>

        <IonItem lines="none">
          <IonText class="text5">Furniture Types: </IonText>
          <IonInput class="login-text5" placeholder="TV, Sofa, etc." onIonChange={e => setFurnitureType(e.detail.value!)}></IonInput>
        </IonItem>

        <IonItem lines="none">
          <IonText class="text6">Notes: </IonText>
          <IonInput class="login-text6" placeholder="Write something." onIonChange={e => setNotes(e.detail.value!)}></IonInput>
        </IonItem>

        <IonItem lines="none">
          <IonText class="text6">Name: </IonText>
          <IonInput class="login-text6" placeholder="Your Name." onIonChange={e => setName(e.detail.value!)}></IonInput>
        </IonItem>

        <IonButton class="btn-submit"onClick={validation}>SUBMIT</IonButton>

      </IonContent>
    </IonPage>
  );
};

export default Home;
