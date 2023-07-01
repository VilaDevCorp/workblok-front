import { VilaLayout } from '../components/ui/VilaLayout';
import { Planner } from '../components/organism/Planner';
import moment from 'moment';


export function PlannerScreen() {
    return (
        <VilaLayout>
            <Planner/>
        </VilaLayout>
    )
}