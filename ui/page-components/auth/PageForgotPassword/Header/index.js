import { ArrowLeftOutlined } from '@ant-design/icons';
import Link from 'next/link';
import style from './style.module.scss';

export default function Header() {
  return (
    <div className={style.container}>
      <Link href="/admin/signin">
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a className={style.back_link}>
          <ArrowLeftOutlined className={style.header_icon} />
          <p className={style.header_title}>Back to Sign In</p>
        </a>
      </Link>
    </div>
  );
}
