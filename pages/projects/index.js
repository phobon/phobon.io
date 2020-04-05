import React from "react";

import { useApi } from '../../hooks';
import { Projects } from '../../components';

export default () => {
  const projects = useApi('/api/projects');
  return (
    <>
      {projects && <Projects projects={projects} />}
    </>
  );
};