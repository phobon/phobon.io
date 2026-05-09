import { css } from '@/design/css'

export type PictureProps = {
  loading?: 'lazy' | 'eager'
  width: any
  height: any
} & any

export const Picture = ({ src, alt, loading = 'lazy', width, height, ...props }: PictureProps) => (
  <div
    className={css({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    })}
    {...props}
  >
    <img src={src} alt={alt} loading={loading} width={width} height={height} />
  </div>
)
