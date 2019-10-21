import React from "react";

import { useApi } from '../../hooks';
import { Projects } from '../../components';

export default () => {
  const projects = useApi('/api/projects');
  return (
    <React.Fragment>
      {projects && <Projects projects={projects} />}
    </React.Fragment>
  );
};