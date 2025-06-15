import { createFileRoute, redirect } from "@tanstack/react-router";
import { useQueryFetchWorkspaceById } from "../Api-Client/workspace";
import Body from "../components/Body";
import WorkspaceMembersSection from "../components/WorkspaceMembersSection";
import WorkspaceTask from "../components/WorkspaceTask";

export const Route = createFileRoute("/workspaces/$workspaceId")({
  beforeLoad: async ({ context }) => {
    if (context.auth.user === null && !context.auth.isAuthenticated) {
      throw redirect({ to: "/login" });
    }
  },
  loader: async ({ params }) => {
    return {
      workspaceId: params.workspaceId,
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { workspaceId } = Route.useLoaderData();

  const {
    data: workspace,
    isLoading,
    isError,
    error,
  } = useQueryFetchWorkspaceById(workspaceId);

  if (isLoading)
    return (
      <Body>
        <div>Loading workspace data...</div>
      </Body>
    );

  if (isError)
    return (
      <Body>
        <div>Error loading workspace: {error?.message}</div>
      </Body>
    );

  if (!workspace || !workspace.data)
    return (
      <Body>
        <div>No workspace data available</div>
      </Body>
    );

  return (
    <Body>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white ">
            {workspace?.data?.workspace.name}
          </h1>
          <p className="text-white/60">
            Manage all tasks related to this workspace
          </p>
        </div>

        {/* Members Section */}
        <WorkspaceMembersSection
          members={workspace?.data.members}
          workspace={workspace.data.workspace}
          workspaceId={workspaceId}
        />

        {/* Tasks Section */}

        <WorkspaceTask tasks={workspace.data.tasks} workspaceId={workspaceId} />
      </div>
    </Body>
  );
}
