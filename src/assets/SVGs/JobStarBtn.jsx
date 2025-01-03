import * as React from 'react';
const SvgComponent = (props) => (
	<svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="none" {...props}>
		<path
			fill="url(#a)"
			d="M7.08 2.941c-.232-.602-.348-.904-.515-.991a.5.5 0 0 0-.463 0c-.168.087-.283.389-.515.991l-.41 1.065c-.188.489-.282.733-.428.939a2 2 0 0 1-.47.47c-.207.147-.45.24-.94.429l-1.064.41c-.603.231-.905.347-.992.514a.5.5 0 0 0 0 .464c.087.167.389.283.992.515l1.064.41c.49.187.733.281.94.427a2 2 0 0 1 .47.471c.146.206.24.45.428.94l.41 1.064c.232.603.347.904.515.991a.5.5 0 0 0 .463 0c.167-.087.283-.389.515-.991l.41-1.065c.187-.489.281-.733.428-.939a2 2 0 0 1 .47-.47c.206-.147.45-.24.94-.429l1.064-.41c.603-.231.904-.347.992-.514a.5.5 0 0 0 0-.464c-.088-.167-.39-.283-.992-.515l-1.065-.41c-.488-.187-.733-.281-.938-.427a2 2 0 0 1-.471-.471c-.147-.206-.24-.45-.429-.94L7.08 2.942Z"
		/>
		<path
			fill="url(#b)"
			d="M11.71 10.914c.12-.239.46-.239.58 0 .099.197.148.295.214.38.058.076.126.144.201.202.086.066.184.115.38.213.24.12.24.462 0 .582-.196.098-.294.147-.38.213a1.113 1.113 0 0 0-.201.201c-.066.086-.115.184-.213.38a.325.325 0 0 1-.582 0c-.098-.196-.147-.294-.213-.38a1.113 1.113 0 0 0-.201-.201c-.086-.066-.184-.115-.38-.213a.325.325 0 0 1 0-.582c.196-.098.294-.147.38-.213.075-.058.143-.126.201-.201.066-.086.115-.184.213-.38Z"
		/>
		<path
			fill="url(#c)"
			d="M11.71.914c.12-.239.46-.239.58 0 .099.197.148.295.214.38.058.076.126.144.201.202.086.066.184.115.38.213.24.12.24.462 0 .582a2.344 2.344 0 0 0-.38.213 1.112 1.112 0 0 0-.201.201c-.066.086-.115.184-.213.38a.325.325 0 0 1-.582 0c-.098-.196-.147-.294-.213-.38a1.112 1.112 0 0 0-.201-.201 2.344 2.344 0 0 0-.38-.213.325.325 0 0 1 0-.582c.196-.098.294-.147.38-.213.075-.058.143-.126.201-.201.066-.086.115-.184.213-.38Z"
		/>
		<defs>
			<linearGradient
				id="a"
				x1={6.333}
				x2={6.333}
				y1={1}
				y2={13}
				gradientUnits="userSpaceOnUse"
			>
				<stop stopColor="#4E42F4" />
				<stop offset={1} stopColor="#89A9DF" />
			</linearGradient>
			<linearGradient
				id="b"
				x1={12}
				x2={12}
				y1={10.333}
				y2={13.667}
				gradientUnits="userSpaceOnUse"
			>
				<stop stopColor="#4E42F4" />
				<stop offset={1} stopColor="#89A9DF" />
			</linearGradient>
			<linearGradient
				id="c"
				x1={12}
				x2={12}
				y1={0.333}
				y2={3.667}
				gradientUnits="userSpaceOnUse"
			>
				<stop stopColor="#4E42F4" />
				<stop offset={1} stopColor="#89A9DF" />
			</linearGradient>
		</defs>
	</svg>
);
export default SvgComponent;
