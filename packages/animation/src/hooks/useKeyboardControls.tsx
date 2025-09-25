import { useCallback, useEffect } from "react";
import { Node, Edge, useReactFlow } from "@xyflow/react";

export interface KeyboardControls {
  onDelete: (nodeIds: string[]) => void;
  onRotate: (nodeIds: string[]) => void;
  onToggleValve: (nodeIds: string[]) => void;
  onDuplicate: (nodeIds: string[]) => void;
}

export function useKeyboardControls(
  selectedNodes: Node[],
  selectedEdges: Edge[],
  onNodesChange: (changes: any[]) => void,
  onEdgesChange: (changes: any[]) => void
): KeyboardControls {
  const { getNode, getEdges, setNodes } = useReactFlow();

  const onDelete = useCallback(
    (nodeIds: string[]) => {
      if (nodeIds.length === 0) return;

      // Delete nodes
      onNodesChange(
        nodeIds.map((id) => ({
          id,
          type: "remove",
        }))
      );

      // Delete connected edges
      const edgesToDelete = getEdges().filter(
        (edge) => nodeIds.includes(edge.source) || nodeIds.includes(edge.target)
      );

      onEdgesChange(
        edgesToDelete.map((edge) => ({
          id: edge.id,
          type: "remove",
        }))
      );
    },
    [onNodesChange, onEdgesChange, getEdges]
  );

  const onRotate = useCallback(
    (nodeIds: string[]) => {
      if (nodeIds.length === 0) return;

      const nodes = getNode
        ? nodeIds.map((id) => getNode(id)).filter(Boolean)
        : [];

      const updatedNodes = nodes.map((node) => {
        if (!node) return node;

        const currentOrientation = (node.data?.orientation as string) || "E";
        const orientations = ["N", "E", "S", "W"];
        const currentIndex = orientations.indexOf(currentOrientation);
        const nextIndex = (currentIndex + 1) % orientations.length;
        const newOrientation = orientations[nextIndex];

        return {
          ...node,
          data: {
            ...node.data,
            orientation: newOrientation,
          },
        };
      });

      setNodes((nds) =>
        nds.map((node) => {
          const updatedNode = updatedNodes.find((n) => n?.id === node.id);
          return updatedNode || node;
        })
      );
    },
    [getNode, setNodes]
  );

  const onToggleValve = useCallback(
    (nodeIds: string[]) => {
      if (nodeIds.length === 0) return;

      const nodes = getNode
        ? nodeIds.map((id) => getNode(id)).filter(Boolean)
        : [];

      const updatedNodes = nodes.map((node) => {
        if (!node) return node;

        // Toggle valve state
        if (node.type === "valve") {
          return {
            ...node,
            data: {
              ...node.data,
              isOpen: !node.data?.isOpen,
            },
          };
        }

        // Toggle control valve
        if (node.type === "controlValve") {
          return {
            ...node,
            data: {
              ...node.data,
              open: (node.data?.open as number) > 0 ? 0 : 1,
            },
          };
        }

        // Toggle damper
        if (node.type === "damper") {
          return {
            ...node,
            data: {
              ...node.data,
              open: (node.data?.open as number) > 0 ? 0 : 1,
            },
          };
        }

        return node;
      });

      setNodes((nds) =>
        nds.map((node) => {
          const updatedNode = updatedNodes.find((n) => n?.id === node.id);
          return updatedNode || node;
        })
      );
    },
    [getNode, setNodes]
  );

  const onDuplicate = useCallback(
    (nodeIds: string[]) => {
      if (nodeIds.length === 0) return;

      const nodes = getNode
        ? nodeIds.map((id) => getNode(id)).filter(Boolean)
        : [];

      const duplicatedNodes = nodes
        .map((node) => {
          if (!node) return null;
          return {
            ...node,
            id: `${node.id}-copy-${Date.now()}`,
            position: {
              x: node.position.x + 50,
              y: node.position.y + 50,
            },
            selected: false,
            data: node.data || {},
          };
        })
        .filter(Boolean) as Node[];

      setNodes((nds) => [...nds, ...duplicatedNodes]);
    },
    [getNode, setNodes]
  );

  // Keyboard event handler
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      const selectedNodeIds = selectedNodes.map((node) => node.id);
      const selectedEdgeIds = selectedEdges.map((edge) => edge.id);

      switch (event.key) {
        case "Delete":
        case "Backspace":
          event.preventDefault();
          if (selectedNodeIds.length > 0) {
            onDelete(selectedNodeIds);
          } else if (selectedEdgeIds.length > 0) {
            onEdgesChange(
              selectedEdgeIds.map((id) => ({
                id,
                type: "remove",
              }))
            );
          }
          break;

        case "r":
        case "R":
          event.preventDefault();
          if (selectedNodeIds.length > 0) {
            onRotate(selectedNodeIds);
          }
          break;

        case " ":
          event.preventDefault();
          if (selectedNodeIds.length > 0) {
            onToggleValve(selectedNodeIds);
          }
          break;

        case "d":
        case "D":
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            if (selectedNodeIds.length > 0) {
              onDuplicate(selectedNodeIds);
            }
          }
          break;

        case "a":
        case "A":
          if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            // Select all nodes
            setNodes((nds) => nds.map((node) => ({ ...node, selected: true })));
          }
          break;

        case "Escape":
          event.preventDefault();
          // Deselect all
          setNodes((nds) => nds.map((node) => ({ ...node, selected: false })));
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [
    selectedNodes,
    selectedEdges,
    onDelete,
    onRotate,
    onToggleValve,
    onDuplicate,
    onEdgesChange,
    setNodes,
  ]);

  return {
    onDelete,
    onRotate,
    onToggleValve,
    onDuplicate,
  };
}
