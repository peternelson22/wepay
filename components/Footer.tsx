import { logoutAccount } from '@/lib/actions/user.actions';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Footer = ({ user, type = 'desktop' }: FooterProps) => {
  const router = useRouter();
  const handleLogout = async () => {
    const loggedOut = await logoutAccount();
    if (loggedOut) return router.push('/signin');
  };
  return (
    <footer className='footer'>
      <div className={type === 'mobile' ? 'footer_name-mobile' : 'footer_name'}>
        <p>{user?.name[0]}</p>
      </div>
      <div
        className={type === 'mobile' ? 'footer_email-mobile' : 'footer_email'}
      >
        <h1 className='text-14 font-semibold text-gray-700 truncate'>
          {user?.name}
        </h1>
        <p className='truncate font-normal text-gray-600'>{user?.email}</p>
      </div>
      <div className='footer_image' onClick={handleLogout}>
        <Image src='/icons/logout.svg' alt='logout' fill />
      </div>
    </footer>
  );
};
export default Footer;
