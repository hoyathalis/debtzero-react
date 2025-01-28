import React from 'react';

interface ModelSelectorProps {
    selectedModel: string;
    setSelectedModel: (model: string) => void;
}

export default function ModelSelector({ selectedModel, setSelectedModel }: ModelSelectorProps) {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newModel = e.target.value;
        console.log(`Model changed to: ${newModel}`);
        setSelectedModel(newModel);
    };

    const containerStyle: React.CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '8px 12px',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        border: '1px solid #e0e0e0',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        width: 'fit-content',
    };

    const labelStyle: React.CSSProperties = {
        fontSize: '14px',
        fontWeight: '500',
        color: '#333333',
    };

    const selectStyle: React.CSSProperties = {
        padding: '6px 8px',
        borderRadius: '6px',
        border: '1px solid #d0d0d0',
        backgroundColor: '#f9f9f9',
        color: '#333333',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        outline: 'none',
        transition: 'border-color 0.2s, box-shadow 0.2s',
    };

    // Add hover and focus effects for better interactivity
    const selectHoverFocusStyle: React.CSSProperties = {
        borderColor: '#007bff',
        boxShadow: '0 0 0 2px rgba(0, 123, 255, 0.25)',
    };

    return (
        <div style={containerStyle}>
            <label htmlFor="modelSelect" style={labelStyle}>Model:</label>
            <select
                id="modelSelect"
                value={selectedModel}
                onChange={handleChange}
                style={{
                    ...selectStyle,
                    ':hover': selectHoverFocusStyle,
                    ':focus': selectHoverFocusStyle,
                }}
            >
                <option value="mock">Mock</option>
                <option value="zerodebt">Zerodebt Model</option>
                <option value="zerodebt-pro">Zerodebt Pro Model</option>
                <option value="o1-preview">O1 Preview</option>
            </select>
        </div>
    );
}