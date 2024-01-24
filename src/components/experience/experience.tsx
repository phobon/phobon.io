import SlideLink from '@/components/slide_link'
import { css } from '@/design/css'
import { cn } from '@/helpers/cn'

const Heading = ({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3
    className={cn(
      css({
        color: '$slate11',
        fontWeight: 'light',
        textAlign: 'left',
        fontSize: '$6',
        lineHeight: 1,
      }),
      className,
    )}
    {...props}
  >
    {children}
  </h3>
)

export type ExperienceProps = {
  employ?: string
  href?: string
  title?: string
  timeframe?: string
  description?: string
  achievements?: any
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export const Experience = ({
  employ,
  href,
  title,
  timeframe,
  description,
  achievements,
  ...props
}: ExperienceProps) => (
  <article
    className={css({
      display: 'grid',
      gridTemplateColumns: {
        base: '1fr',
        md: '1fr 2fr',
      },
      gridGap: {
        base: '$4',
        md: 0,
      },
      gridTemplateRows: 'auto',
      alignItems: 'start',
    })}
    {...props}
  >
    <div
      className={css({
        width: '100%',
        display: 'flex',
        justifyContent: {
          base: 'start',
          md: 'center',
        },
        alignItems: {
          base: 'center',
          md: 'flex-start',
        },
        flexDirection: {
          base: 'row',
          md: 'column',
        },
        gap: {
          base: '0',
          md: '$2',
        },
      })}
    >
      <Heading
        className={css({
          mr: {
            base: '$2',
            md: 0,
          },
        })}
      >
        <SlideLink href={href}>{employ}</SlideLink>
      </Heading>
      <span
        className={css({
          fontSize: '$5',
          color: '$slate9',
        })}
      >
        {timeframe}
      </span>
    </div>

    <div
      className={css({
        width: '100%',
        display: 'flex',
        justifyContent: {
          base: 'start',
          md: 'center',
        },
        alignItems: 'flex-start',
        flexDirection: 'column',
        gap: '$4',
      })}
    >
      <Heading color='foreground'>{title}</Heading>
      <p
        className={css({
          fontSize: {
            base: '$4',
            md: '$5',
          },
          color: '$slate9',
          mt: '$2',
        })}
      >
        {description}
      </p>

      {achievements && (
        <ul
          className={css({
            display: 'grid',
            gridTemplateColumns: {
              base: '1fr',
              md: 'repeat(2, 1fr)',
            },
            width: '100%',
            gridAutoRows: 'auto',
            alignItems: 'flex-start',
            gridGap: '$4',
          })}
        >
          {achievements.map(({ key, title, description, href }) => (
            <li
              className={css({
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
              })}
              key={key}
            >
              {href ? (
                <SlideLink href={href} fontSize={[4, 5]}>
                  {title}
                </SlideLink>
              ) : (
                <span
                  className={css({
                    fontSize: {
                      base: '$4',
                      md: '$5',
                    },
                    color: '$slate11',
                  })}
                >
                  {title}
                </span>
              )}
              <span
                className={css({
                  fontSize: {
                    base: '$4',
                    md: '$5',
                  },
                  color: '$slate9',
                })}
              >
                {description}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  </article>
)
