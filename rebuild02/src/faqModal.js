import React, {Component} from 'react';
import {Button, Modal} from 'react-bootstrap';

class FaqModal extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: false
        };
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    render(){
        return (
        <>
        <Button variant="secondary" onClick={this.handleShow}>FAQ</Button>
        <Modal size="lg" show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>GrimBuilds FAQ</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Playstyles</h4>
                <p><span>DW</span>: Dual Wield</p>
                <p><span>Caster</span>: Primarly casts spells/uses skills instead of default attacks/replacers.</p>
                <p><span>Retaliation</span>: Primarly deals damage through getting hit.</p>
                <p><span>2H</span>: Two Handed Weapon</p>
                <h4>Gear Requirements</h4>
                <p><span>Moderate Farming Legendaries</span>: Mostly legendary items, some epics or vendor/crafted items.</p>
                <p><span>Heavy Farming Legendaries</span>: Almost all farmed legendaries.</p>
                <p><span>1 MI Farming</span>: Requires a specific Monster Infrequent, usually with specific affixes.</p>
                <p><span>2+ MI Farming</span>: Just like 1 MI, but with multiple Infrequents.</p>
                <p><span>General MI Note</span>: I am only counting MIs that come from specific enemies as hard-to-farm MIs. MIs from enemies that there are countless numbers of are not counted here.</p>
                <h4>Crucible/Shattered Realms</h4>
                <p>These are the maximum tested levels that can be cleared with the build. A lot of times, having a 1+ rating does not mean the build sucks, it just means it has not been tested.</p>
                <h4>Purposes</h4>
                <p><span>Leveling</span>: Exactly what it sounds like, use this to level to 100.</p>
                <p><span>New Players</span>: This is for new players without a huge stash of gear.</p>
                <p><span>Farming</span>: These builds are good for quickly clearing high-loot areas.</p>
                <p><span>Main Campaign</span>: These builds are designed to kill specific bosses or challenges present in the main storyline quests.</p>
                <p><span>Endgame</span>: These are designed to clear the "main" content such as nemesis bosses, Celestials, or the "roguelike" dungeons.</p>
                <p><span>Shattered Reamls/Crucible</span>: These builds are designed for high-speed, high-level clearing of these extra hard modes.</p>
            </Modal.Body>
            <Modal.Footer><Button variant="secondary" onClick={this.handleClose}>Close</Button></Modal.Footer>
        </Modal>
        </>
        );
    }
}

export default FaqModal;
