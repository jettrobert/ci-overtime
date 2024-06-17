import React, { useState, useEffect } from 'react';
import "./NodeStyles.css";
import { Input, InputPicker, TagPicker } from 'rsuite';
import { PiStarFill, PiClock } from 'react-icons/pi';
import { IconType } from "react-icons";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: { label: string; icon: string; type: string }) => void;
    position: { x: number; y: number };
}

const iconMap: { [key: string]: IconType } = {
    Internal: PiClock,
    Webhook: PiStarFill,
};

const RootNodeModal: React.FC<ModalProps> = ({ isOpen, onClose, onSave, position }) => {
    const [label, setLabel] = useState('');
    const [icon, setIcon] = useState('');
    const [type, setType] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [selectedFrequency, setSelectedFrequency] = useState('');

    useEffect(() => {
        setLabel('');
        setIcon('');
        setType('');
        setSelectedType('');
        setSelectedFrequency('');
    }, [isOpen]);

    const handleSave = () => {
        const iconName = iconMap[selectedType] ? selectedType : '';
        onSave({ label, icon: iconName, type: selectedType });
        onClose();
    };

    const handleTypeButtonClick = (type: string) => {
        setType(type);
        setSelectedType(type);
    };

    const getButtonStyle = (buttonType: string) => {
        return selectedType === buttonType ? { backgroundColor: 'darkgray' } : {};
    };

    const frequencies = [
        { label: 'Specified interval', value: 'Specified interval' },
        { label: 'Every day', value: 'Every day' },
        { label: 'Days of the week', value: 'Days of the week' },
        { label: 'Days of the month', value: 'Days of the month' },
        { label: 'Specified date', value: 'Specified date' }
    ];

    const weekdays = [
        { label: "Monday", value: "Monday"},
        { label: "Tuesday", value: "Tuesday"},
        { label: "Wednesday", value: "Wednesday"},
        { label: "Thursday", value: "Thursday"},
        { label: "Friday", value: "Friday"},
        { label: "Saturday", value: "Saturday"},
        { label: "Sunday", value: "Sunday"},
    ];

    const daysOfMonth = Array.from({ length: 31 }, (v, i) => ({
        label: `${i + 1}`,
        value: `${i + 1}`
    }));

    if (!isOpen) return null;

    return (
        <div className="modal" style={{ top: position.y, left: position.x }}>
            <div className="modal-content">
                <div className="type-buttons">
                    <button
                        className="type-button-items"
                        style={getButtonStyle('Internal')}
                        onClick={() => handleTypeButtonClick('Internal')}
                    >
                        Internal
                    </button>
                    <button
                        className="type-button-items"
                        style={getButtonStyle('Webhook')}
                        onClick={() => handleTypeButtonClick('Webhook')}
                    >
                        Webhook
                    </button>
                    <div className="trigger-description">This trigger (or root) node sets the interval at which you autonomous agent send out "ticks" to the event space. This will trigger the subsequent control flow and action nodes, bringing your agent to life. Internal triggers are programmed to send ticks at specific intervals or at regular times. Webhook triggers send ticks when webhooks are triggered on other platforms.</div>
                </div>
                <div className="type-info">
                    {selectedType === 'Internal' &&
                        <div>
                            This is an internal trigger that operates on a set schedule.
                            <div>How often should this run?</div>
                            <InputPicker
                                data={frequencies}
                                style={{ width: '100%', height: 20, marginTop: 10, marginBottom: 10 }}
                                onChange={(value) => setSelectedFrequency(value)}
                            />
                            <div style={{ marginTop: 20 }}>
                                {selectedFrequency === 'Specified interval' && <div>Enter the interval in minutes: <Input type="number" placeholder="Interval in minutes" /></div>}
                                {selectedFrequency === 'Every day' && <div>Select the time of day: <Input type="time" placeholder="HH:MM" /></div>}
                                {selectedFrequency === 'Days of the week' && <div>Select the days of the week: <TagPicker data={weekdays} style={{ width: "100%" }} /><div style={{ marginTop: "20px"}}>Select the time of day: <Input type="time" placeholder="HH:MM" /></div></div>}
                                {selectedFrequency === 'Days of the month' && <div>Select the days of the month: <TagPicker data={daysOfMonth} style={{ width: "100%" }} /><div style={{ marginTop: "20px"}}>Select the time of day: <Input type="time" placeholder="HH:MM" /></div></div>}
                                {selectedFrequency === 'Specified date' && <div>Enter the specific date: <Input type="datetime-local" placeholder="?" /></div>}
                            </div>
                        </div>
                    }

                    {selectedType === 'Webhook' &&
                        <div>
                            This trigger activates based on a webhook event.
                            <div className="type-form-subtitles">Name your Webhook</div>
                            <Input placeholder="My Culture Industry webhook" />
                            <div className="type-form-subtitles">Set IP Restrictions (Optional)</div>
                            <Input placeholder="IP Restrictions" />
                        </div>
                    }
                </div>
                <div style={{ marginTop: '20px' }}>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default RootNodeModal;
