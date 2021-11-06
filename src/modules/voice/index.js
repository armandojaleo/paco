export default class Voice {
  constructor() {
    //this.listenToService = this.listenToService.bind(this)
  }

  listenToService() {

    var self = this;
    //apis
    //---------------------------------------------------------------------
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var synth = window.speechSynthesis;

    //configuration
    //---------------------------------------------------------------------
    var voices = synth.getVoices().sort(function (a, b) {
      const aname = a.name.toUpperCase(), bname = b.name.toUpperCase();
      if (aname < bname) return -1;
      else if (aname == bname) return 0;
      else return +1;
    });

    var recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'es-ES';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    var transcript;
    recognition.start();
    recognition.onresult = async function (event) {
      transcript = event.results[0][0].transcript;
      if (transcript.includes('Paco')) {
        console.log('Me:  ', transcript);
        await speechService(transcript);
      };
    };
    recognition.onspeechend = async function () {
      recognition.stop();
      self.listenToService();
    };
    recognition.onerror = function (event) {
      self.listenToService();
    };
  };

  //test to speech
  async speechService(textToSpeech) {
    if (textToSpeech != undefined) {
      await preProcessSpeech(textToSpeech)
        .then(processedSpeech => {
          var utterance = new SpeechSynthesisUtterance(processedSpeech);
          utterance.voice = voices[23];
          utterance.pitch = 1;
          utterance.rate = 1;
          speechSynthesis.speak(utterance);
        });
    } else {
      this.listenToService();
    };
  };

  //pre process speech
  async preProcessSpeech(speech) {
    //return await getWeather().then(weather => {
      var bot = [
        { in: 'hola|holita', out: 'hola, ¿cómo estás?' },
        { in: 'adiós', out: 'adiós, un placer hablar contigo' },
        { in: 'tortilla|tortilla de jamon', out: 'me encantan las tortillas' },
        { in: 'hora|la hora', out: 'getTime()' },
        { in: 'día', out: 'getDate()' },
        //{ in: 'como tenemos el día', out: weather.weather.toLowerCase() },
        //{ in: 'tiempo', out: 'ahora tenemos un tiempo ' + weather.weather.toLowerCase() + ' y ' + weather.temperature },
        //{ in: 'temperatura', out: 'ahora tenemos una temperatura de ' + weather.temperature },
        { in: 'cállate', out: 'me callo' },
        { in: 'crea lista|nueva lista de la compra', out: createShopBag() },
        { in: 'agrega {item}|agrega a la lista de la compra {item}', out: addToShopBag(item) },
        { in: 'lista de la compra', out: getShopBagList() },
        { in: 'elimina {item}|elimina de la lista de la compra {item}', out: removeFromShopBag(item) },
        { in: 'elimina lista|elimina lista de la compra', out: deleteShopBag() },
      ];
      var speechProcessed = bot.find(f => {
        var ins = f.in.split('|');
        return ins.some(e => {
          var itemPositionBot = e.indexOf('{item}');
          var itemSpeechText = speech.subtring(itemPositionBot);
          var out = speech.replace('Paco', '').includes(e.replace('{item}', ''));

        });
      })?.out ?? '¿' + speech.replace('Paco', '').trim() + ' de qué?';
      console.log("Bot: ", speechProcessed);
      return speechProcessed;
    //})
  };

  static load() {
    console.log('Voice module loaded')
    return true;
  }

}