const WORD_LIST_1 = [
  'Luna',
  'Phobos',
  'Deimos',
  'Eros',
  'Gaspra',
  'Ida',
  'Dactyl',
  'Mathilde',
  'Kalliope',
  'Eugenia',
  'Europa',
  'Ganymede',
  'Callisto',
  'Amalthea',
  'Himalia',
  'Elara',
  'Pasiphae',
  'Sinope',
  'Lysithea',
  'Carme',
  'Ananke',
  'Leda',
  'Thebe',
  'Adrastea',
  'Metis',
]

const WORD_LIST_2 = [
  'Callirrhoe',
  'Themisto',
  'Megaclite',
  'Taygete',
  'Chaidene',
  'Harpalyke',
  'Kalyke',
  'Iocaste',
  'Erinome',
  'Isonoe',
  'Praxidike',
  'Autonoe',
  'Thyone',
  'Hermippe',
  'Aitne',
  'Eurydome',
  'Euanthe',
  'Euporie',
  'Orthosie',
  'Sponde',
  'Kale',
  'Pasithee',
  'Mneme',
  'Aoede',
  'Thelxinoe',
]

const WORD_LIST_3 = [
  'Arche',
  'Kallichore',
  'Helike',
  'Carpo',
  'Eukelade',
  'Cyliene',
  'Kore',
  'Herse',
  'Dia',
  'Eirene',
  'Philophrosyne',
  'Eupheme',
  'Valetudo',
  'Pandia',
  'Ersa',
  'Mimas',
  'Enceladus',
  'Tethys',
  'Dione',
  'Rhea',
  'Titan',
  'Hyperion',
  'Iapetus',
  'Phoebe',
  'Janus',
]

const getRandomElementFromArray = <T extends any>(arr: T[]): T => {
  const index = Math.floor(Math.random() * arr.length)
  const v = arr[index]
  return v
}

export const generateUniqueNameTriad = () => {
  const uniqueNameTriad: string[] = []
  uniqueNameTriad.push(getRandomElementFromArray<string>(WORD_LIST_1))
  uniqueNameTriad.push(getRandomElementFromArray<string>(WORD_LIST_2))
  uniqueNameTriad.push(getRandomElementFromArray<string>(WORD_LIST_3))
  return uniqueNameTriad.join(' ')
}
