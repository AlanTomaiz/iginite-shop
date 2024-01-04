import { styled } from "..";

export const HomeContainer = styled('main', {
  display: 'flex',
  // gap: '3rem',
  width: '100%',
  maxWidth: 'calc(100vw - ((100vw - 1180px) / 2))',
  marginLeft: 'auto',
  minHeight: 656
})

export const ProductBox = styled('div', {
  position: 'relative',
  background: 'linear-gradient(180deg, #1ea483 00%, #7465d4 100%)',
  borderRadius: 8,
  // padding: '0.25rem',
  cursor: 'pointer',
  overflow: 'hidden',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover'
  },

  footer: {
    position: 'absolute',
    bottom: '0.25rem',
    left: '0.25rem',
    right: '0.25rem',
    padding: '2rem',

    borderRadius: 4,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    background: 'rgba(0, 0, 0, 0.6)',

    opacity: 0,
    transform: 'translateY(100%)',
    transition: 'all 0.2s ease-in-out'
  },

  'footer strong': {
    fontSize: '$lg',
    color: '$gray100'
  },

  'footer span': {
    fontSize: '$xl',
    fontWeight: 'bold',
    color: '$green300'
  },

  '&:hover footer': {
    opacity: 1,
    transform: 'translateY(0%)'
  }
})
