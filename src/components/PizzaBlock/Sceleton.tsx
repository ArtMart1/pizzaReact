import React from 'react';
import ContentLoader from 'react-content-loader';

const Sceleton = (props: any) => (
  <ContentLoader
    speed={2}
    width={280}
    height={460}
    viewBox="0 0 280 460"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <circle cx="120" cy="120" r="120" />
    <rect x="160" y="338" rx="0" ry="0" width="24" height="0" />
    <rect x="14" y="256" rx="16" ry="16" width="220" height="28" />
    <rect x="0" y="299" rx="16" ry="16" width="250" height="88" />
    <rect x="0" y="408" rx="16" ry="16" width="50" height="36" />
    <rect x="92" y="402" rx="24" ry="24" width="152" height="45" />
  </ContentLoader>
);

export default Sceleton;
