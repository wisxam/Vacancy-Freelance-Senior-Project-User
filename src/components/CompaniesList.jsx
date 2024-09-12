import React from 'react';
import CategoryCard from './CategoryCard';

const CompaniesList = ({ companies }) => {
	return (
		<div>
			{companies.map((company) => (
				<CategoryCard
					key={company.id}
					id={company.id}
					address={company.address}
					name={company.name}
					profile_picture={company.profile_picture}
					email={company.email}
					phone={company.phone}
					type={company.type}
					description={company.description}
					goTo={`/companies/${company.id}`}
				/>
			))}
		</div>
	);
};

export default CompaniesList;
