const days = [
  'Lundi',
  'Mardi',
  'Mercredi',
  'Jeudi',
  'Vendredi',
  'Samedi',
  'Dimanche',
]

const months = [
  'Janvier',
  'Février',
  'Mars',
  'Avril',
  'Mai',
  'Juin',
  'Juillet',
  'Août',
  'Septembre',
  'Octobre',
  'Novembre',
  'Décembre',
]

const FADE_IN_ANIMATION_CONFIG = {
  toValue: 0.7,
  duration: 100,
  useNativeDriver: true,
}

const FADE_OUT_ANIMATION_CONFIG = {
  toValue: 1,
  duration: 100,
  useNativeDriver: true,
}

const SIZE_IN_ANIMATION_CONFIG = {
  toValue: 1.5,
  duration: 500,
  useNativeDriver: true,
}

const SIZE_OUT_ANIMATION_CONFIG = {
  toValue: 1,
  duration: 500,
  useNativeDriver: true,
}

export {
  FADE_IN_ANIMATION_CONFIG,
  FADE_OUT_ANIMATION_CONFIG,
  SIZE_IN_ANIMATION_CONFIG,
  SIZE_OUT_ANIMATION_CONFIG,
  days,
  months,
}
