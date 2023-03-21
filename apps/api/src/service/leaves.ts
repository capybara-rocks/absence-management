import { Leave } from '../entity/Leave';

let leaves: Leave[] = [
  {
    id: 1,
    status: 0,
    reason:
      'ฟรังก์ริคเตอร์แฮปปี้เพรียวบางโมหจริต โฟล์คอพาร์ตเมนต์บอมบ์ บ๊อบสต็อค ยูวี มอบตัว โอยัวะบาบูน ฟิวเจอร์พุทธศตวรรษผู้นำครัวซองต์ วานิลาช็อคบ๊อกซ์ คอร์รัปชัน เซ็นเซอร์มอยส์เจอไรเซอร์แคมปัสจิตเภทเท็กซ์ เมเปิลคันธาระเปเปอร์เพลซฟรังก์ชั่นคอนเซปต์',
    leaveDate: '2023-05-06T00:00:00.000Z',
  },
  {
    id: 2,
    status: 0,
    reason:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    leaveDate: '2023-05-06T00:00:00.000Z',
  },
];

export const findAll = () => {
  return leaves;
};

export const findOne = (id: number) => {
  return leaves.find((l) => l.id === id);
};

export const create = (leave: Omit<Leave, 'id'>) => {
  const createdLeave = { id: leaves.length + 1, ...leave };
  leaves.push(createdLeave);
  return createdLeave;
};

export const update = (id: number, leave: Partial<Leave>) => {
  const index = leaves.findIndex((l) => l.id === id);
  const updatedValue = { ...leaves[index], ...leave };
  leaves = [
    ...leaves.slice(0, index),
    { ...leaves[index], ...leave },
    ...leaves.slice(index + 1),
  ];
  return updatedValue;
};

export const destroy = (id: number) => {
  const index = leaves.findIndex((l) => l.id === id);
  leaves = [...leaves.slice(0, index), ...leaves.slice(index + 1)];
};
