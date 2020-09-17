# frozen_string_literal: true

module Views
  module Apartments
    class ImagesSliderComponent < ApplicationComponent
      def initialize(apartment: nil)
        @apartment = apartment
      end
    end
  end
end
