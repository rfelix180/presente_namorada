import React, { useState, useEffect, useMemo } from 'react';
import ReactPlayer from 'react-player'; // Import ReactPlayer
import { 
  differenceInCalendarYears, 
  differenceInCalendarMonths, 
  differenceInCalendarDays,
  getDaysInMonth,
  differenceInHours 
} from 'date-fns';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import './App.css';
import ImageGallery from './components/ImageGallery'; 
import { Helmet } from 'react-helmet'; // Import the Helmet component

function App() {
  const startDate = useMemo(() => new Date('10/08/2024'), []); 
  const formattedStartDate = format(startDate, 'dd/MM/yyyy', { locale: ptBR });

  const calculateDuration = (startDate, endDate) => { 
    let years = differenceInCalendarYears(endDate, startDate);
    let months = differenceInCalendarMonths(endDate, startDate) - years * 12;
    let days = differenceInCalendarDays(endDate, startDate) - (years * 365.25 + months * 30.44); 
    let hours = differenceInHours(endDate, startDate) % 24; 

    // Ajustar para valores negativos de meses e dias
    if (months < 0) {
      years--;
      months += 12;
    }
    if (days < 0) {
      months--;
      days += getDaysInMonth(new Date(endDate.getFullYear(), endDate.getMonth() - 1));
    }

    // Arredondar os dias para um número inteiro
    days = Math.floor(days); 

    return { years, months, days, hours };
  };

  const [duration, setDuration] = useState(() => {
    const endDate = new Date();
    return calculateDuration(startDate, endDate); 
  }); 

  useEffect(() => {
    const intervalId = setInterval(() => {
      const endDate = new Date();
      setDuration(calculateDuration(startDate, endDate)); 
    }, 1000);

    return () => clearInterval(intervalId);
  }, [startDate]); 

  const images = [
    '/imagens/1.jpeg',
    '/imagens/2.jpg',
    '/imagens/3.jpg',
    '/imagens/4.jpg',
    '/imagens/5.jpg',
    '/imagens/6.jpg',
    '/imagens/7.jpg',
    '/imagens/8.jpg',
    '/imagens/9.jpg',
    '/imagens/10.jpg',
    '/imagens/11.jpg', 
    '/imagens/12.jpg',
    '/imagens/13.jpg',
    '/imagens/14.jpg',
    '/imagens/15.jpg',
    '/imagens/16.jpg',
    '/imagens/17.jpg',
    '/imagens/18.jpg',
    '/imagens/19.jpg',
    '/imagens/20.jpg',
    '/imagens/21.jpg',
    '/imagens/22.jpg',
    '/imagens/23.jpg',
    '/imagens/24.jpg',
    '/imagens/25.jpg',
    '/imagens/26.jpg',
    '/imagens/27.jpg',
    '/imagens/28.jpg',
    '/imagens/29.jpg',
    '/imagens/30.jpg',
    '/imagens/31.jpg',
    '/imagens/32.jpg',
  ];
  
  const [isContentLoaded, setIsContentLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayerVisible, setIsPlayerVisible] = useState(true); // Player visible initially

  const handlePlay = () => {
    setIsPlaying(true);
    setIsContentLoaded(true);
    setIsPlayerVisible(false);
  };


  return (
    <div className="App">
      <Helmet>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
      <link href="https://fonts.googleapis.com/css2?family=Ballet:opsz@16..72&family=Great+Vibes&family=Pinyon+Script&display=swap" rel="stylesheet"/>
      </Helmet>
      {isContentLoaded && (
        <h1>Ricardo e Laís</h1>
      )}

{!isPlaying && <h2 className="play-text" style={{ fontSize: '35px', marginTop: '300px'}}>Aperte o Play</h2>}
      
        <div className={`player-container ${isPlayerVisible ? '' : 'hidden'}`}>
        <ReactPlayer
          className={`custom-player ${isPlaying ? 'hidden' : ''}`}
          url="/musica/vamos_fugir.mp3"
          playing={isPlaying} // Control playback state
          controls={true}
          width="150px"
          height="80px"
          onPlay={handlePlay}
        />
      </div>

      {isContentLoaded && (
        <div>
      <h2>Vamos Fugir?! ♪</h2>
      <ImageGallery images={images} />
      <p>Você me veio como um sonho bom</p>
      <p>Iluminando os meus dias</p>
      <p>É tudo o que eu precisava e não sabia</p> 
      <p>É a luz que brilha nos meus olhos</p> 
      <p>O meu Ikigai de cada dia</p> 
      <p>Amor da minha vida.</p> 
      <p>Quero te fazer a mulher mais feliz do mundo!</p> 
      <h3>Te amo mais que tudo ♥</h3>  
      <h2>Juntos há:</h2>
      <p>
        {duration.years > 0 ? `${duration.years} anos, ` : ''}
        {duration.months} meses, {duration.days} dias e {duration.hours} horas. 
      </p> 
      <p>Nosso Date: {formattedStartDate}</p>
      </div>
      )}
    </div>
  );
}

export default App;