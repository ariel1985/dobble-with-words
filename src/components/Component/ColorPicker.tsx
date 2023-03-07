interface ColorPickerProps {
  id: string
  onClick: (color: string, id: string) => void
}

export function ColorPicker(props: ColorPickerProps) {
  const colors = [
    '#009688',
    '#00BCD4',
    '#03A9F4',
    '#2196F3',
    '#3F51B5',
    '#4CAF50',
    '#607D8B',
    '#673AB7',
    '#795548',
    '#8BC34A',
    '#9C27B0',
    '#CDDC39',
    '#E91E63',
    '#F44336',
    '#FF5722',
    '#FF9800',
    '#FFC107',
    '#FFEB3B',
  ]

  return (
    <div className="color-picker">
      {colors.map((color, id) => (
        <button
          id={props.id}
          className="swatch"
          key={id}
          style={{
            backgroundColor: color,
          }}
          onClick={(e) => props.onClick(color, e.currentTarget.id)}
        />
      ))}
    </div>
  )
}
