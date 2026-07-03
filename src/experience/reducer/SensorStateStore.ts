import {ElementID} from "../../data/model/element/ElementModel";
import {ChannelID} from "../../data/model/element/marker/ChannelID";

export class SensorStateStore {
    private channelSensors: Map<ChannelID, Map<ElementID, boolean>> = new Map();
    private elementChannel: Map<ElementID, ChannelID> = new Map();
    private sensorListeners: Map<ElementID, Set<() => void>> = new Map();
    private channelListeners: Map<ChannelID, Set<() => void>> = new Map();

    registerSensor(elementID: ElementID, channelID: ChannelID): () => void {
        if (!this.channelSensors.has(channelID)) {
            this.channelSensors.set(channelID, new Map());
        }
        this.channelSensors.get(channelID)!.set(elementID, false);
        this.elementChannel.set(elementID, channelID);

        return () => {
            const sensors = this.channelSensors.get(channelID);
            if (!sensors) {
                return;
            }
            sensors.delete(elementID);
            if (sensors.size === 0) {
                this.channelSensors.delete(channelID);
            }
            this.elementChannel.delete(elementID);
        };
    }

    subscribeSensorCallback(elementID: ElementID, callback: () => void): () => void {
        if (!this.sensorListeners.has(elementID)) {
            this.sensorListeners.set(elementID, new Set());
        }
        const listeners = this.sensorListeners.get(elementID)!;
        listeners.add(callback);
        return () => listeners.delete(callback);
    }

    subscribeChannelCallback(channelID: ChannelID, callback: () => void): () => void {
        if (!this.channelListeners.has(channelID)) {
            this.channelListeners.set(channelID, new Set());
        }
        const listeners = this.channelListeners.get(channelID)!;
        listeners.add(callback);
        return () => listeners.delete(callback);
    }

    updateSensorState(elementID: ElementID, newState: boolean) {
        const channelID = this.elementChannel.get(elementID);
        if (!channelID) {
            return;
        }

        const sensors = this.channelSensors.get(channelID);
        if (!sensors) {
            return;
        }
        if (!sensors.has(elementID)) {
            return;
        }

        const oldSensorState = sensors.get(elementID);
        const oldChannelState = this.getChannelState(channelID);

        sensors.set(elementID, newState);

        if (oldSensorState !== newState) {
            this.sensorListeners.get(elementID)?.forEach(l => l());
        }

        if (oldChannelState !== this.getChannelState(channelID)) {
            this.channelListeners.get(channelID)?.forEach(l => l());
        }
    }

    getSensorState(elementID: ElementID): boolean {
        const channelID = this.elementChannel.get(elementID);
        if (!channelID) {
            return false;
        }

        return this.channelSensors.get(channelID)?.get(elementID) ?? false;
    }

    getChannelState(channelID: ChannelID): boolean {
        const sensors = this.channelSensors.get(channelID);
        if (!sensors) {
            return false;
        }
        if (sensors.size === 0) {
            return false;
        }

        for (const state of sensors.values()) {
            if (!state) {
                return false;
            }
        }
        return true;
    }
}
