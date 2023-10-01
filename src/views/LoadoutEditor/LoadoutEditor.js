import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import DraggableViewBase from '../../components/DraggableViewBase/DraggableViewBase';

export default function LoadoutEditor () {
    const {npcId} = useParams();
    const [params] = useSearchParams();

    const [name, setName] = useState('');
    const [flavorText, setFlavorText] = useState('');
    const [race, setRace] = useState('');
    const [type, setType] = useState('');
    const [threatRating, setThreatRating] = useState('');
    const [soulEnergy, setSoulEnergy] = useState('');
    const [stats, setStats] = useState({
        strength: 0,
        endurance: 0,
        agility: 0,
        intelligence: 0,
        willpower: 0,
        perception: 0,
        personality: 0,
        luck: 0,
        hitPoints: 0,
        woundThreshold: 0,
        magicka: 0,
        stamina: 0,
        initiative: 0,
        actionPoints: 0,
        speed: 0,
        size: 'Standard',
        combat: 0,
        magic: 0,
        evade: 0,
        observe: 0,
        stealth: 0,
        knowledge: 0,
        social: 0,
        physical: 0,
    });
    const [equipment, setEquipment] = useState([]);
    const [specialAbilities, setSpecialAbilities] = useState([]);
    const [traits, setTraits] = useState([]);
    const [spells, setSpells] = useState([]);
    const [unconventionalSkills, setUnconventionalSkills] = useState([]);
    // const [specialHitCharts, setSpecialHitCharts] = useState([]);
    const [encounteringText, setEncounteringText] = useState('');
    const [loot, setLoot] = useState([]);
    const [customNotes, setCustomNotes] = useState([]);

    useEffect(() => {
        (async () => {
            if (npcId) {
                const npc = await window.bestiary.getOne(npcId);

                setName(npc.name);
                setFlavorText(npc.flavorText);
                setRace(npc.race);
                setType(npc.type);
                setThreatRating(npc.threatRating);
                setSoulEnergy(npc.soulEnergy);
                setStats({ ...npc.stats });
                setEquipment([...npc.equipment]);
                setSpecialAbilities([...npc.specialAbilities]);
                setTraits([...npc.traits]);
                setSpells([...npc.spells]);
                setUnconventionalSkills([...npc.unconventionalSkills]);
                setEncounteringText(npc.encounteringText);
                setLoot([...npc.loot]);
                setCustomNotes([...npc.customNotes]);
            }
        })();
    }, [npcId])

    return (
        <DraggableViewBase title={`Loadout Editor (${name})`}>
            <Typography variant="h4">{name}</Typography>
            <Typography variant="h4">{JSON.stringify(params)}</Typography>
        </DraggableViewBase>
    )

};
