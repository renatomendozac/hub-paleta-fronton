import FacebookIcon from '@/icons/FacebookIcon'
import InstagramIcon from '@/icons/InstagramIcon'
import { SocialMediaLinks } from '@/utils/social-media-links'
import Link from 'next/link'

const Suggestions = () => {
  return (
    <div className="w-full max-w-xl m-auto">
      <h1 className="text-xl font-bold text-center mb-6">¡Ayúdanos a mejorar!</h1>

      <div className="mb-6 text-lg">
        <p className="mb-4">
          Queremos ofrecerte la mejor experiencia posible. Tus sugerencias son importantes para nosotros. Cuéntanos qué piensas, qué te gustaría ver o cómo podemos hacer que esta plataforma sea aún mejor para ti.
        </p>

        <ul className="list-disc ml-6">
          <li>¿Qué te gusta?</li>
          <li>¿Qué podríamos mejorar?</li>
          <li>¿Tienes alguna idea nueva?</li>
        </ul>
      </div>

      <div className="mb-10 text-lg">
        <p className='font-bold'>
          Tu opinión cuenta.
        </p>
        <p className="mb-4">
          Escríbenos directamente en nuestras redes sociales:
        </p>

        <ul className="flex justify-center gap-6">
          <li>
            <Link
              className='underline underline-offset-8 text-right'
              href={SocialMediaLinks.Facebook}
              target="_blank"
              rel="noopener nofollow"
            >
              <FacebookIcon className="text-main" />
            </Link>
          </li>
          <li>
            <Link
              className='underline underline-offset-8 text-right'
              href={SocialMediaLinks.Instagram}
              target="_blank"
              rel="noopener nofollow"
            >
              <InstagramIcon className="text-main" />
            </Link>
          </li>
        </ul>
      </div>

      <p className='text-sm text-center'>¡Gracias por ayudarnos a crecer y mejorar cada día!</p>
    </div>
  )
}

export default Suggestions
