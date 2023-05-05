import React from 'react';
import styles from './BreadCrumbs.module.scss';
import { Breadcrumb } from 'antd';
import { StarFilled } from '@ant-design/icons';
import { useAppSelector } from '../../app/hooks';


export const BreadCrumbs: React.FC = () => {
  const { owner, repo, stars } = useAppSelector(state => state.issues);
  const ownerUrl = `https://github.com/${owner}`;
  const repoUrl = `https://github.com/${owner}/${repo}`;
  const breadCrumbsItems = [
    {
      title: owner,
      href: ownerUrl,
    },
    {
      title: repo,
      href: repoUrl,
    }
  ];

  const starCount = Math.round(stars / 10) / 100;

  if (!owner || !repo) {
    return null;
  }

  return (
    <div className={styles.container}>
      <Breadcrumb
        separator=">"
        items={breadCrumbsItems}
      />
      <div className={styles.stars}>
        <StarFilled style={{ color: 'yellow', marginRight: '5px' }} />
        <p>{starCount} K stars</p>
      </div>
    </div>
  );
};
