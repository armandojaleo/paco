import Base from "./modules/base"
import Voice from "./modules/voice"
import Music from "./modules/music"


Base.load()
Voice.load()
Music.load()

const base = new Base
const voice = new Voice
const music = new Music

voice.listenToService()