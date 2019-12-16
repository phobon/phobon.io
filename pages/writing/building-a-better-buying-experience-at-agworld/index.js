import React from 'react'
import Router from 'next/router'
import fetch from 'isomorphic-unfetch'
import nextCookie from 'next-cookies'
import { withAuthSync } from '../../../utils/auth'
import Content from './building-a-better-buying-experience-at-agworld.mdx';

Content.getInitialProps = async ctx => {
  const { token } = nextCookie(ctx);
  const { pathname } = ctx;

  const redirectOnError = () =>
    typeof window !== 'undefined'
      ? Router.push({
        pathname: '/login',
        query: { pathname },
      })
      : ctx.res.writeHead(302, { Location: '/login' }).end();

  try {
    const response = await fetch('../../api/protected', {
      credentials: 'include',
      headers: {
        Authorization: JSON.stringify({ token }),
      },
    });

    if (response.ok) {
      return;
    } else {
      // https://github.com/developit/unfetch#caveats
      return await redirectOnError();
    }
  } catch (error) {
    // Implementation or Network error
    console.log(error);
    return redirectOnError();
  }
}

export default withAuthSync(Content);