interface HeaderInfoProps {
  name?: string;
  description?: string;
}

export const HeaderInfo: React.FC<HeaderInfoProps> = ({
  name = '이근휘',
  description = 'Geuni620',
}) => {
  return (
    <div className="flex flex-col gap-2 text-[22px]">
      <div>
        <li>{name}</li>
        <li>{description === 'Geuni620' ? 'Geuni620' : ''}</li>
      </div>

      {/* <div>
        <time dateTime={'2023-02-11'} className="mb-1 text-base text-gray-600">
          {new Intl.DateTimeFormat('en-US').format(new Date('2023-02-11'))}
        </time>
      </div> */}
    </div>
  );
};
