interface OverlayProps {
    open: boolean;
    onClose: () => void;
}

export default function Overlay({
    open,
    onClose,
}: OverlayProps) {
    if (!open) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 z-30 bg-black/50 md:hidden"
            onClick={onClose}
        />
    );
}