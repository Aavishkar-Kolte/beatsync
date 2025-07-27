"use client";
import { useClientId } from "@/hooks/useClientId";
import { useGlobalStore } from "@/store/global";
import { Users } from "lucide-react";
import { useMemo } from "react";
import { Badge } from "../ui/badge";
import { TooltipProvider } from "../ui/tooltip";
import { ConnectedUserItem } from "./ConnectedUserItem";

export const ConnectedUsersList = () => {
  const { clientId } = useClientId();
  const clients = useGlobalStore((state) => state.connectedClients);
  // const reorderClient = useGlobalStore((state) => state.reorderClient);
  const setAdminStatus = useGlobalStore((state) => state.setAdminStatus);

  // Get current user from global store
  const currentUser = useGlobalStore((state) => state.currentUser);
  const isCurrentUserAdmin = currentUser?.isAdmin || false;

  // Memoize client data to avoid unnecessary recalculations
  const clientsWithData = useMemo(() => {
    return clients.map((client) => {
      const isCurrentUser = client.clientId === clientId;
      return { client, isCurrentUser };
    });
  }, [clients, clientId]);

  return (
    <TooltipProvider>
      <div className="">
        <div className="flex items-center justify-between px-4 pt-3">
          <h2 className="text-xs font-medium uppercase tracking-wider text-neutral-500 flex items-center gap-2">
            <Users className="h-3.5 w-3.5" />
            <span>Connected Users</span>
          </h2>
          <Badge variant="outline">{clients.length}</Badge>
        </div>

        <div className="px-4 pb-3">
          {clients.length === 0 ? (
            <div className="text-center py-8 text-neutral-500 text-xs">
              No other users connected
            </div>
          ) : (
            <div className="space-y-2">
              {/* List of connected users - Constrained height */}
              <div className="relative mt-2.5">
                <div className="space-y-1 overflow-y-auto flex-shrink-0 scrollbar-thin scrollbar-thumb-rounded-md scrollbar-thumb-muted-foreground/10 scrollbar-track-transparent hover:scrollbar-thumb-muted-foreground/20 -mx-1">
                  {clientsWithData.map(({ client, isCurrentUser }) => (
                    <ConnectedUserItem
                      key={client.clientId}
                      client={client}
                      isCurrentUser={isCurrentUser}
                      isAdmin={isCurrentUserAdmin}
                      onSetAdmin={setAdminStatus}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </TooltipProvider>
  );
};
