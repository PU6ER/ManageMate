import { useActions } from "../../hooks/useActions";
import { useProjects } from "../../hooks/useProjects";
import { useGetProjectsQuery } from "../../store/api/api";
import ProjectItem from "../project-item/ProjectItem";

const ProjectsSection = () => {
  const { data, isLoading } = useGetProjectsQuery(null);
  const { setProjectId } = useActions();
  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        data?.map((project) => (
          <div className="">
            <span onClick={() => setProjectId(project.id)}>{project.name}</span>
          </div>
        ))
      )}
    </div>
  );
};

export default ProjectsSection;
