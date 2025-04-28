import { createFileRoute } from "@tanstack/react-router";
import Body from "../components/Body";
import WorkspaceModal from "../components/WorkspaceModal";
import WorkspaceCard from "../components/WorkspaceCard";
import { useQueryAllWorkspace } from "../Api-Client/workspace";

export const Route = createFileRoute("/workspaces/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isLoading } = useQueryAllWorkspace();


  return (
    <>
      <Body>
        <div className="flex flex-col gap-8 pt-8 pb-4">
          <WorkspaceModal />
          <div>
            {isLoading ? (
              <h1>Workspace Loading...</h1>
            ) : (
              <main>
                <div>
                  <h1 className="text-amber-600 font-semibold text-lg">
                    Your Workspaces
                  </h1>
                  <div>
                    {data?.data.workspaceWhereUserIsAdmin.length === 0 ? (
                      <h1>You haven't created your own workspace</h1>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                        {data?.data.workspaceWhereUserIsAdmin.map(
                          (workspace, index) => (
                            <WorkspaceCard
                              key={index}
                              workspaceId={workspace.id}
                              name={workspace.name}
                              taskCompleted={workspace.taskCompleted}
                              createdAt={new Date(
                                workspace.createdAt
                              ).toLocaleDateString()}
                              workspaceCreatorName={
                                workspace.workspaceCreatorName!
                              }
                              totalMembers={workspace.totalMembers}
                              totalTasks={workspace.totalTasks}
                            />
                          )
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-8">
                  <h1 className="text-amber-600 font-semibold text-lg">
                    Others Workspace You're Part Of
                  </h1>

                  <div>
                    {data?.data.workspaceWhereUserIsPartOf.length === 0 ? (
                      <h1>You haven't yet been added to others worksapce</h1>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                        {data?.data.workspaceWhereUserIsPartOf.map(
                          (workspace, index) => (
                            <WorkspaceCard
                              key={index}
                              workspaceId={workspace.id}
                              name={workspace.name}
                              taskCompleted={workspace.taskCompleted}
                              createdAt={new Date(
                                workspace.createdAt
                              ).toLocaleDateString()}
                              workspaceCreatorName={
                                workspace.workspaceCreatorName!
                              }
                              totalMembers={workspace.totalMembers}
                              totalTasks={workspace.totalTasks}
                            />
                          )
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </main>
            )}
          </div>
        </div>
      </Body>
    </>
  );
}
